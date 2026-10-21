<?php
declare(strict_types=1);
namespace InvoiceDesk;
use PDO;
final class Store {
    public PDO $pdo;
    public function __construct(public string $dir) {
        if (!is_dir($dir) && !mkdir($dir, 0700, true)) throw new \RuntimeException('Private storage directory is not writable.');
        @chmod($dir, 0700);
        if (!is_file($dir.'/.htaccess')) file_put_contents($dir.'/.htaccess', "Require all denied\n");
        $this->pdo = new PDO('sqlite:' . $dir . '/invoicedesk.sqlite', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
        @chmod($dir.'/invoicedesk.sqlite',0600);
        $this->pdo->exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
        $this->pdo->exec(<<<'SQL'
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY,email TEXT UNIQUE COLLATE NOCASE,name TEXT,hash TEXT,role TEXT CHECK(role IN ('admin','analyst','viewer')),enabled INTEGER DEFAULT 1,version INTEGER DEFAULT 1,created_at TEXT);
CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY,hits INTEGER,until_at INTEGER);
CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY,user_id INTEGER,event TEXT,detail TEXT,created_at TEXT);
CREATE TABLE IF NOT EXISTS invoices (id INTEGER PRIMARY KEY,client_id INTEGER,number TEXT,date TEXT,due_date TEXT,paid_date TEXT,status TEXT,currency TEXT,subtotal INTEGER,tax INTEGER,tax2 INTEGER,total INTEGER,credit INTEGER,balance INTEGER,client_name TEXT,country TEXT,gstin TEXT,gst_status TEXT,basis TEXT,review INTEGER,issues TEXT,payload TEXT,fetched_at TEXT,source_hash TEXT,pdf_check TEXT);
CREATE INDEX IF NOT EXISTS inv_date ON invoices(date,id);
CREATE INDEX IF NOT EXISTS inv_paid ON invoices(paid_date,id);
CREATE INDEX IF NOT EXISTS inv_due ON invoices(due_date,id);
CREATE INDEX IF NOT EXISTS inv_client ON invoices(client_id,date,id);
CREATE INDEX IF NOT EXISTS inv_gst ON invoices(gst_status,review);
CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY,name TEXT,email TEXT,currency TEXT,wallet INTEGER,data TEXT,fetched_at TEXT,ledger_at TEXT);
CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY,client_id INTEGER,invoice_id INTEGER,date TEXT,currency TEXT,gateway TEXT,reference TEXT,amount_in INTEGER,amount_out INTEGER,fees INTEGER,refund_id INTEGER,data TEXT);
CREATE INDEX IF NOT EXISTS tx_client ON transactions(client_id,date,id);
CREATE INDEX IF NOT EXISTS tx_invoice ON transactions(invoice_id);
CREATE INDEX IF NOT EXISTS tx_date ON transactions(date);
CREATE TABLE IF NOT EXISTS credits (id INTEGER PRIMARY KEY,client_id INTEGER,date TEXT,amount INTEGER,description TEXT);
CREATE TABLE IF NOT EXISTS reviews (invoice_id INTEGER PRIMARY KEY,status TEXT,note TEXT,user_id INTEGER,updated_at TEXT,source_hash TEXT);
CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY,type TEXT,state TEXT,params TEXT,cursor TEXT,total INTEGER DEFAULT 0,done INTEGER DEFAULT 0,errors INTEGER DEFAULT 0,message TEXT,created_at TEXT,updated_at TEXT);
CREATE TABLE IF NOT EXISTS tasks (job_id TEXT,record_id INTEGER,state TEXT DEFAULT 'pending',attempts INTEGER DEFAULT 0,error TEXT,PRIMARY KEY(job_id,record_id),FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS payment_stage (job_id TEXT,record_id INTEGER,client_id INTEGER,payload TEXT,PRIMARY KEY(job_id,record_id),FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE CASCADE);
CREATE INDEX IF NOT EXISTS stage_client ON payment_stage(job_id,client_id);
CREATE TABLE IF NOT EXISTS coverage (id INTEGER PRIMARY KEY,job_id TEXT,kind TEXT,from_date TEXT,to_date TEXT,client_id INTEGER,completed_at TEXT);
CREATE TABLE IF NOT EXISTS pdfs (invoice_id INTEGER PRIMARY KEY,path TEXT,sha256 TEXT,source_hash TEXT,fetched_at TEXT,size INTEGER);
SQL);
    }
    public function run(string $sql, array $args = []): \PDOStatement { $s=$this->pdo->prepare($sql); $s->execute($args); return $s; }
    public function all(string $sql, array $args = []): array { return $this->run($sql,$args)->fetchAll(); }
    public function one(string $sql, array $args = []): ?array { return $this->run($sql,$args)->fetch() ?: null; }
    public function get(string $key, mixed $default = null): mixed { $r=$this->one('SELECT value FROM settings WHERE key=?',[$key]); return $r ? json_decode($r['value'],true,512,JSON_THROW_ON_ERROR) : $default; }
    public function set(string $key, mixed $value): void { $this->run('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',[$key,json_encode($value,JSON_THROW_ON_ERROR)]); }
    public function atomic(callable $f): mixed {
        $this->pdo->beginTransaction();
        try { $r=$f(); $this->pdo->commit(); return $r; } catch(\Throwable $e) { if($this->pdo->inTransaction())$this->pdo->rollBack(); throw $e; }
    }
}
