# InvoiceDesk — cPanel quick start

1. Extract the full source outside `public_html`.
2. Serve only `public/`. If copying its contents into a different document root, update the `require` path in `api.php` to the private `app/bootstrap.php`.
3. Copy `config.example.php` to `config.php`; set a random 32+ character setup token, keep HTTPS enabled, and choose private writable storage.
4. Open the app over HTTPS. Create your administrator account with the token.
5. Settings → Connection → configure WHMCS API credentials **or** a SELECT-only MySQL user → Test & save.
6. For original PDFs, install the included bridge beside WHMCS `init.php`, put its configuration outside the web root, and enter its URL/shared secret in Settings.
7. Settings → GST & preferences → set your own supplier GSTIN and exact recipient GST custom-field names.
8. Import one full client ledger and compare it with WHMCS. Then sync your date range and payment journal.
9. Select invoices or all filtered results → Bulk download → original PDFs, printable copies, or optional PDF-text GSTIN scan.
10. Add the worker command to cPanel Cron Jobs to continue imports when the browser is closed:

```cron
* * * * * /opt/cpanel/ea-php82/root/usr/bin/php /home/ACCOUNT/invoicedesk/bin/console.php work --seconds=45
```

Use the PHP binary and paths from your account. Full bridge setup, cron examples, backup instructions, accounting definitions, and troubleshooting are in `README.md`.

Requirements: PHP 8.2+, PDO SQLite, OpenSSL, cURL; PDO MySQL for database mode; ZipArchive for bulk downloads. PDF text scans additionally require pdftotext/proc_open. No Composer or Node build is needed.

The package has not been connected to your live WHMCS. Its original-PDF adapter must be checked against your installed WHMCS release. A GSTIN regex/checksum pass does not establish active registration or decide tax treatment; exports are reconciliation working papers.
