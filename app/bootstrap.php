<?php
declare(strict_types=1);
namespace InvoiceDesk;

spl_autoload_register(function (string $name): void {
    $prefix = 'InvoiceDesk\\';
    if (str_starts_with($name, $prefix)) {
        $path = __DIR__ . '/' . str_replace('\\', '/', substr($name, strlen($prefix))) . '.php';
        if (is_file($path)) require $path;
    }
});
function config(): array {
    static $c;
    if ($c === null) {
        $file = dirname(__DIR__) . '/config.php';
        $c = is_file($file) ? require $file : require dirname(__DIR__) . '/config.example.php';
        $c['storage'] = getenv('INVOICEDESK_STORAGE') ?: $c['storage'];
        date_default_timezone_set($c['timezone'] ?? 'Asia/Kolkata');
    }
    return $c;
}
function db(): Store { static $db; return $db ??= new Store(config()['storage']); }
function json(array $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE); exit;
}
function h(mixed $v): string { return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function now(): string { return date('Y-m-d H:i:s'); }
function rows(mixed $value, string $key): array {
    if (!is_array($value) || !$value) return [];
    $r = $value[$key] ?? $value;
    if (!is_array($r) || !$r) return [];
    return array_is_list($r) ? $r : [$r];
}
function validDate(string $v): string {
    $d = \DateTimeImmutable::createFromFormat('!Y-m-d', $v);
    if (!$d || $d->format('Y-m-d') !== $v) throw new \InvalidArgumentException('Use a valid YYYY-MM-DD date.');
    return $v;
}
function dateRange(array $q): array {
    $from = validDate((string)($q['from'] ?? date('Y-m-01')));
    $to = validDate((string)($q['to'] ?? date('Y-m-d')));
    if ($from > $to) throw new \InvalidArgumentException('Start date must not follow end date.');
    return [$from, $to];
}
function audit(string $event, array $data = []): void {
    db()->run('INSERT INTO audit(user_id,event,detail,created_at) VALUES(?,?,?,?)', [$_SESSION['uid'] ?? null, $event, json_encode($data), now()]);
}
function lock(string $name) {
    $f = fopen(config()['storage'] . '/' . preg_replace('/[^a-z0-9_-]/i', '', $name) . '.lock', 'c');
    if (!$f || !flock($f, LOCK_EX | LOCK_NB)) throw new \RuntimeException('Another worker is active. Try again shortly.');
    return $f;
}
