# InvoiceDesk for WHMCS

A small, self-hosted billing workspace for HostingSpell: invoice viewing, original PDF downloads, bulk ZIP exports, recipient GSTIN checks, client settlement ledgers, payment journals, and analytics. PHP 8.2+, vanilla JavaScript, local SQLite cache. No Composer, Node.js, external fonts, CDNs, or background daemon required in production.

This package contains the complete source. It starts empty. No WHMCS credentials, preset administrator password, sample customers, or payment data are shipped.

## What works

| Area | Included |
| --- | --- |
| Connections | WHMCS API identifier/secret, or PDO MySQL with a dedicated SELECT-only user; either mode can use the optional WHMCS bridge |
| Invoices | Inclusive issue/due/paid date ranges, search, status/currency/tax/GSTIN filters, pagination, detail viewer, line items, payments, printable copy |
| Downloads | Original WHMCS PDFs through bridge; resumable ZIP jobs for selected or all filtered invoices; CSV result manifest; individual PDF view; printable HTML archives without bridge |
| GST | Recipient regex extraction, format/state/checksum checks, supplier exclusion, custom field mapping, evidence provenance, conflicts, exception review notes, stale-review detection |
| Tax analysis | Recipient-evidence categories, tax levels and rates, GSTIN state-code groups, duplicate invoice-number checks, working-paper CSV, optional bulk original-PDF text scan |
| Clients | Complete per-client invoice/payment/credit imports, reconstructed settlement ledger, opening and closing balances, source balance comparison, separate payment and wallet registers |
| Analytics | Billed sales, actual cash receipts, tax recorded, current outstanding, aging, monthly billing, gateway collections; currencies never combined |
| Operations | One-record worker steps, idempotent cache writes, visible failures, retry/cancel, short profile caching, cron worker, hook queue, activity log |
| Access | Separate administrator/analyst/viewer accounts, password changes, encrypted connector secrets, CSRF protection, private sessions, login rate limiting, HTTPS by default |
| Interface | AMOLED black and light themes, configurable accent, responsive navigation, keyboard focus and labeled controls |

## Requirements

- PHP **8.2 or later**, 64-bit. PHP 8.2 is a compatibility minimum; use a security-supported PHP release on your host.
- Extensions: `pdo_sqlite`, `openssl`, `curl`, `json`, `session`, `ctype`.
- `pdo_mysql` for database mode. `zip` for bulk downloads.
- HTTPS for app and bridge.
- Private writable directory on local disk. SQLite on NFS/network-mounted storage is not supported.
- Optional: an installed `pdftotext` executable plus `proc_open` for actual PDF-text matching. Without it, original PDFs still download and billing-field checks still work.
- WHMCS bridge runs under the PHP version and ionCube loader supported by your installed WHMCS. The dashboard can use a separate PHP version.

## Install on cPanel

### Recommended: expose only the public files

1. Extract the package to `/home/ACCOUNT/invoicedesk` outside `public_html`.
2. Copy everything inside `public/`, **including `.htaccess`**, to `/home/ACCOUNT/public_html/invoices` (or a subdomain document root).
3. In that public folder's `api.php`, change the bootstrap line to:

   ```php
   require '/home/ACCOUNT/invoicedesk/app/bootstrap.php';
   ```

4. In `/home/ACCOUNT/invoicedesk`, copy `config.example.php` to `config.php`.
5. Set `setup_token` to your own random string of at least 32 characters. Keep `require_https` enabled. Choose a private storage path, e.g. `/home/ACCOUNT/private/invoicedesk-data`.
6. Open `https://YOURDOMAIN/invoices/`. Enter the setup token, administrator email, name, and a password of at least 12 characters.
7. Sign in → Settings → Connection → choose API or database mode → **Test & save**.
8. Add the bridge below if you need original PDFs and historical invoice metadata.
9. Sync one known client first; compare the result with WHMCS, including a refund and an invoice paid with credit. Then import your required date range.

You can instead point a subdomain directly at the package's `public/` directory. In that layout, keep the original relative bootstrap line in `api.php`.

Do not point the document root at the project root. The root `.htaccess` denies access and `public/.htaccess` explicitly permits public assets. Apache 2.4/LiteSpeed must honor the included rules if any private project files sit beneath a web root. Do not use PHP's development server as a production server.

### Optional terminal setup

```bash
cd /home/ACCOUNT/invoicedesk
/opt/cpanel/ea-php82/root/usr/bin/php bin/console.php init
/opt/cpanel/ea-php82/root/usr/bin/php bin/console.php doctor
```

`init` creates `config.php` with a random setup token only if the file does not exist. It prints that one-time installation token to your terminal. Complete account setup in the browser. Use your actual cPanel PHP binary if different.

### WHMCS API mode

Create API credentials for a restricted role with these six actions:

```text
GetInvoices
GetInvoice
GetClientsDetails
GetCurrencies
GetTransactions
GetCredits
```

Allow the dashboard server's outgoing IP in WHMCS API access controls. Set:

- Instance name: a stable label such as `manage.hostingspell.com`.
- API endpoint: `https://manage.hostingspell.com/includes/api.php`.
- API identifier and secret from WHMCS.

No administrator password or client impersonation is required. API mode reads data only. It never adds payments, sends invoices, changes clients, or updates accounting records.

`GetInvoices` has no documented start/end date parameters. The connector scans invoice headers in stable ID order, then filters and fetches the matching details. If the count shifts or IDs repeat during pagination, it stops visibly. Start a new scan to reconcile that period. API reads are not an atomic source snapshot; run historical exports during quieter periods and compare totals.

The API transaction/credit endpoints are checked against their reported total. A partial result is rejected. Large all-account payment journals may exceed the 16 MiB response cap; use database mode or per-client ledger imports in that case.

### Direct database mode

Use cPanel → MySQL Databases to create a **separate database user**, assign it to the WHMCS database, and grant **SELECT only**. Do not choose ALL PRIVILEGES. A cPanel database-name/user prefix is normally required.

- Same server/account: host `localhost`, port `3306`.
- Enter the actual WHMCS database name, SELECT-only user and its password.
- For a remote MySQL connection, configure a valid CA path and TLS at the database server. Use the API instead if you cannot establish verified TLS.

The connector uses prepared queries, a read-only session, keyset pagination, bounded pages, and schema checks. It reads `tblinvoices`, `tblinvoiceitems`, `tblclients`, `tblcurrencies`, `tblaccounts`, `tblcredit`, `tblcustomfields`, and `tblcustomfieldsvalues`. It does not bootstrap WHMCS or read its configuration/password files. No WHMCS tables are created or changed.

API and database modes can be switched for the **same WHMCS instance**. Keep the instance name unchanged. A different WHMCS system needs a separate installation/private cache, so numeric invoice IDs cannot collide.

## Install the WHMCS bridge

Standard API data does not contain original PDF bytes. The bundled bridge makes original PDFs and model-backed metadata available without exposing client login sessions.

1. Copy `integration/bridge-config.example.php` to `/home/ACCOUNT/private/invoicedesk-bridge-config.php`.
2. Set:
   - `secret`: a distinct random secret of at least 32 characters.
   - `whmcs_root`: the actual directory containing WHMCS `init.php`.
   - `private_dir`: a private local queue directory outside the web root.
   - Optional `allow_ips`: exact dashboard server IPs.
3. Copy `integration/invoicedesk-bridge.php` beside WHMCS `init.php`. Edit its private configuration path near the top.
4. The WHMCS PHP runtime also needs `pdo_sqlite`, its normal WHMCS dependencies, and the correct ionCube loader.
5. In dashboard Settings → Connection, enter the bridge HTTPS URL and the matching secret. Test and save.
6. Open a **known invoice → Original PDF**. Compare its number, customer, taxes, total, and template with the WHMCS download.

The bridge signs requests with HMAC-SHA256, enforces a five-minute time window, stores used nonces to reject replays, and serves only `health`, `metadata`, `pdf`, `events`, and `ack` actions. Keep the two servers' clocks synchronized. Connector secrets never appear in URLs.

### Version-dependent PDF and snapshot support

The default PDF adapter calls WHMCS's internal `pdfInvoice()` function **when available**, loaded from `includes/invoicefunctions.php`. This is not a documented public PDF API and can vary by WHMCS release/template. The bridge rejects responses that are not PDF data; it does not silently substitute a recreated invoice.

If your installed version needs another rendering path, set `pdf_adapter` to an absolute private PHP file that **returns a callable accepting an invoice ID and returning original PDF bytes**. Its implementation must use the actual installed WHMCS rendering interface. This release has not been validated inside your live WHMCS installation.

Historical metadata uses the documented Invoice model's snapshot relation. Recognized client-data layouts are normalized. Unrecognized layouts remain **current-profile evidence** and stay flagged; they are not mislabeled as historical proof. `snapshot_adapter` can point at a private PHP file returning a callable that accepts the loaded invoice model and returns normalized billing fields, or `null`. Map the actual schema of your installed release. Do not return current client data from that adapter as a snapshot.

Original PDFs are generated by WHMCS **at fetch time**, then retained with SHA-256 and source timestamps. They are not guaranteed to be the exact bytes emailed years earlier. The app never modifies the WHMCS PDF template.

### Optional hooks

Copy `integration/invoicedesk-hooks.php` into WHMCS `includes/hooks/` and edit its private configuration path. Hooks write a small local queue entry for invoice events. They do not perform remote requests or PDF generation during checkout/payment processing. Queue writes have a 50 ms lock wait; failures are logged without blocking WHMCS. Use periodic reconciliation because hooks can miss administrative or third-party changes.

Choose **Sync & downloads → Check WHMCS hook queue**, or run the CLI `hooks` command. Events are acknowledged only after a successful refresh, using a version token so a newer event is not accidentally removed.

Deleted invoices cannot be refreshed; a full date/client reconciliation removes deleted cached invoices after successful completion. A queued deleted ID remains an explicit failure; reconcile the date/client, then investigate/remove the stale queue entry locally if required.

## Daily use

1. **Sync invoices** for your date range. Issue, due, and paid dates are distinct scopes; start and end dates are inclusive.
2. **Import payment journal** for cash collection analytics. An invoice-only sync includes its linked payments, but can omit deposits, unallocated transactions, and payments for invoices outside your invoice range.
3. Filter Invoices, open the viewer, inspect evidence, or download originals.
4. Select invoices, or choose all filtered results, then build a PDF or HTML ZIP. Each ZIP includes `manifest.csv` and `README.txt`. Maximum 10,000 invoices per archive; split larger exports by month.
5. Optionally choose **Bulk download → Scan original PDF GSTINs** to check original PDF text for the whole selection (bridge + configured pdftotext required). Results remain separate from profile/snapshot evidence, and appear in invoice CSV exports.
6. Use GST review to record your findings. A source change makes the previous decision stale. Review notes never alter GSTIN validation or source tax amounts.
7. Run **Full client sync** before relying on a ledger. It imports that client's complete invoice list, payment/refund history, current credit balance, and credit movement log.

ZIP export failures remain visible; a partial archive explicitly lists failed invoices. Retry failed records to complete it. Interrupted jobs can resume in the browser or with cron. The browser refreshes progress while it processes; close the tab only if a cron worker is configured.

## GST and accounting semantics

- A GSTIN check answers whether a **recipient candidate** has the expected regular-taxpayer format, a recognized state code, and a matching check digit. Nonstandard tax identifiers/UINs are sent for review.
- A format/checksum pass **does not verify active registration, ownership, legal validity, B2B/B2C treatment, place of supply, export/SEZ status, reverse charge, or eligibility for tax credit**. Registration status remains `not_checked`.
- The configured supplier GSTIN is excluded from recipient matching. Configure it before checking PDF text.
- GSTIN fields and WHMCS tax amounts are independent. A sale with no recipient GSTIN can still carry GST. A recipient GSTIN does not make every charge taxable.
- Standard Tax ID and explicitly mapped client custom fields are checked. GSTIN-like text in notes is a separate finding, not proof of recipient identity.
- Historical invoice snapshots outrank current profiles. Profile evidence is labeled and flagged, including a short, configurable profile-cache interval. Fields outside billing/GST needs are not retained.
- PDF text matching excludes the supplier, lists all candidates, and flags ambiguity. It is not OCR, and cannot prove a candidate belongs to the recipient. Image-only PDFs require visual inspection.
- Tax levels 1 and 2 remain separate source amounts/rates. The app does **not** infer CGST, SGST, IGST, HSN/SAC, or statutory return rows from generic WHMCS tax fields. CSVs are reconciliation working sheets, not GSTR upload files or filed returns.
- Money uses integer hundredths and decimal-string parsing, matching WHMCS's two-decimal billing fields. Multi-currency amounts are never added into one total. Historical currency is read from bridge metadata where available; otherwise current client currency is labeled as inferred and flagged.
- Sales totals exclude drafts, cancelled/refunded invoices, add-funds documents, and mass-pay wrappers. Raw invoice exports retain these records for review. Refund cash flows appear in the payment journal; statutory credit notes are not manufactured.
- Settlement ledgers debit eligible invoice totals, credit applied wallet amounts, credit linked receipts, and debit linked refunds. Unallocated payments and credit-wallet movements have separate registers to prevent counting a wallet transfer as fresh revenue.
- Credit application timestamps are not provided by the standard invoice API; reconstructed ledger entries use invoice dates. Status changes, imported historical balances, and manual adjustments can make a reconstructed opening differ from a historical accounting ledger. Compare with current WHMCS balances. This is not a general ledger or audited period-close system.
- Billed sales and cash receipts use different date scopes. Cash analytics filter by transaction date and currency; invoice-specific status, search, GST filters do not redefine the all-account cash journal.

## Cron and automation

Use the cPanel PHP binary with the necessary extensions. Paths below are examples.

```cron
# Continue queued jobs, one record at a time, for about 45 seconds per invocation.
* * * * * /opt/cpanel/ea-php82/root/usr/bin/php /home/ACCOUNT/invoicedesk/bin/console.php work --seconds=45 >> /home/ACCOUNT/private/invoicedesk-worker.log 2>&1

# Poll optional WHMCS hooks every five minutes. Queued events remain if another job is active.
*/5 * * * * /opt/cpanel/ea-php82/root/usr/bin/php /home/ACCOUNT/invoicedesk/bin/console.php hooks >> /home/ACCOUNT/private/invoicedesk-hooks.log 2>&1

# Reconcile a rolling 90 days of issued invoices each night (default CLI scope).
15 2 * * * /opt/cpanel/ea-php82/root/usr/bin/php /home/ACCOUNT/invoicedesk/bin/console.php sync >> /home/ACCOUNT/private/invoicedesk-sync.log 2>&1

# Remove expired downloadable ZIPs daily.
30 3 * * * /opt/cpanel/ea-php82/root/usr/bin/php /home/ACCOUNT/invoicedesk/bin/console.php prune >> /home/ACCOUNT/private/invoicedesk-prune.log 2>&1
```

Only one active job is accepted. Concurrent workers use a file lock and do not process the same task simultaneously. A slow upstream request can extend one worker step; HTTP requests have a 10-second timeout. Keep log files rotated. Reconcile older periods periodically; a rolling window alone cannot detect every historical edit/deletion.

Original cached PDFs are retained separately from ZIPs for reuse. Back up or remove old PDF cache files according to your own retention needs. Only ZIP retention is automated; no accounting data or cached originals are automatically purged by this release.

## Backup, recovery, and upgrades

```bash
php bin/console.php backup --out=/home/ACCOUNT/private/invoicedesk-2026-10-21.sqlite
php bin/console.php reset-password --email=admin@example.com
```

Back up `config.php`, the SQLite snapshot, and **the matching `master.key`** using restricted access. Without the key, encrypted connector credentials cannot be decrypted. Back up `pdf/` and `archives/` only if you need their cached documents. Do not copy just a running SQLite main file without its WAL; the CLI backup uses SQLite `VACUUM INTO` for a consistent database snapshot.

For a full filesystem backup, stop workers and browser jobs, checkpoint/close SQLite, then back up the private directory. Do not serve backups from a public URL. Restore to a private directory, restore the matching key, verify permissions, and run `doctor`.

Before upgrading: back up, stop workers, preserve `config.php` and the private data directory, replace application/public files, and run the tests. The first release creates its schema automatically. Subsequent schema changes will need an explicit migration plan.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| JSON error / blank page | PHP version, PDO SQLite/OpenSSL, private PHP error log, public bootstrap path |
| Login/session does not persist | Private sessions directory writable; HTTPS and cookies; same app host |
| HTTP 403 before app loads | `public/.htaccess` must contain `Require all granted`; expose only public files |
| WHMCS authentication rejected | API identifier/secret, six required role actions, outgoing IP allowlist |
| PDF not available | Bridge health, private config path, shared secret, PHP/ionCube compatibility, installed PDF adapter/template |
| GSTIN looks current instead of historical | WHMCS Store Client Data Snapshot, bridge metadata, snapshot adapter for that release |
| Invoice count changed during API scan | Start a fresh reconciliation scan; avoid concurrent deletes during exports |
| Payment API response too large/partial | Database mode, or full client sync for a smaller client scope |
| Ledger differs from accounting records | Full client sync, refund/status treatment, invoice-date credit application, imported adjustments, currency changes |
| SQLite busy / worker already active | Let the active step finish; do not put private SQLite files on NFS; confirm worker paths use the same storage |
| PDF text check unavailable | Configure `pdftotext` in config.php; enable proc_open if permitted; visual inspection still works |
| ZIP download expired | Recreate the archive; original cached invoices remain available |

## Tests and validation

```bash
php tests/run.php
find app public integration bin -name '*.php' -print0 | xargs -0 -n1 php -l
```

See `docs/VALIDATION.md` for the checks performed on this build and the integration checks still required against your WHMCS installation. No live WHMCS system was connected during package creation.

## Primary interface references

- https://developers.whmcs.com/api-reference/getinvoices/
- https://developers.whmcs.com/api-reference/getinvoice/
- https://developers.whmcs.com/api-reference/getclientsdetails/
- https://developers.whmcs.com/api-reference/gettransactions/
- https://developers.whmcs.com/api-reference/getcredits/
- https://developers.whmcs.com/api-reference/getcurrencies/
- https://developers.whmcs.com/classes/whmcs/billing/invoice
- https://developers.whmcs.com/hooks-reference/invoices-and-quotes/
- https://docs.whmcs.com/9-1/billing-and-invoicing/invoicing-tutorials/snapshot-customer-invoice-data/
- https://tutorial.gst.gov.in/userguide/taxpayersdashboard/Search_Taxpayer_manual.htm

The reference interface is the established WHMCS API (`includes/api.php`), not the newer REST API. Verify capabilities on your installed release. InvoiceDesk is an independent integration, not a WHMCS product.
