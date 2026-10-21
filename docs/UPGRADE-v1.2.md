# Munshi Ji v1.2

This release includes the v1.1 download register and database diagnostics, plus a shared React interface using TanStack Query 5 and TanStack Table 9. The primary accent is bright orange. Choose System, Light, Dark, or AMOLED in the top bar. The AMOLED canvas is true #000000. Theme preferences are saved on the current browser. Mobile invoice cards keep download status, selection and PDF actions visible without horizontal scrolling.

## Upgrade safely

1. Back up the current installation.
2. Replace source files and the public/assets/modern folder with this release.
3. Keep your existing config.php, integration/bridge-config.php, and the entire configured private storage folder. Keep invoicedesk.sqlite and its matching master.key together.
4. Hard refresh the browser. Existing users, credentials, invoices and history remain in the same database. No new installation or administrator is needed.

Production assets are included. You do not need Node, npm, Composer, or a build process on cPanel. The PHP runtime requirements remain PHP 8.2+, PDO SQLite, OpenSSL and cURL; use PDO MySQL for direct database access and ZIP for bulk files.

## Development

The editable frontend is in ui/. Run npm install and npm run build there to regenerate public/assets/modern. The prebuilt bundle runs entirely in the browser; PHP handles authentication, authorization, read-only WHMCS access and private storage. The previous vanilla frontend assets remain for reference and are no longer loaded by index.php.

Settings includes Connection & preferences, Diagnostics, Team access, Activity and My account. The database connection mode is available in the cPanel edition. The hosted Sites edition uses HTTPS APIs, encrypted server-side credentials, shared persistent data and private file storage; it does not make a raw MySQL connection.

See UPGRADE-v1.1.md for log locations, database error codes and download tracking semantics. Earlier references cannot be recovered by the new logger; reproduce the error after updating.

## Verification and limits

The release was checked with 36 PHP fixture tests, 11 hosted integration tests, independent ZIP CRC validation, TypeScript checks, production builds, and browser checks for filters, invoice details, themes and mobile layout. Live WHMCS credentials were not supplied. Verify your connection and PDF adapter against your own WHMCS version before relying on the data.

Download status records completed server responses through this installation, not browser disk saving or downloads made directly through WHMCS. Source freshness tracks imported invoice/accounting data; a WHMCS template-only change cannot be detected from invoice API data. HTML copies and CSV files do not clear pending original PDF status.
