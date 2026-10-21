# Build validation — 21 October 2026

## Completed

- **31 automated checks passed**, zero failures, on PHP 8.2 in a local WebAssembly runtime with real PDO SQLite, OpenSSL, and ZipArchive. The same core suite was also exercised during development on PHP 8.5.
- PHP syntax checks completed for application, connector, integration, CLI, and public PHP files. JavaScript syntax check passed.
- Actual PHP HTTP requests checked installation, login/session CSRF flow, dashboard/GST routes, settings saves, users, and enforcement of viewer restrictions on settings and sync writes.
- Chromium browser checks on desktop (1440 px) and mobile (390 px): login, invoice register, invoice-detail dialog, GST summaries, client list, ledger tabs, connection/preferences screens, navigation, AMOLED/light switching. No JavaScript page errors or horizontal page overflow in those checks. Screenshots were inspected internally; synthetic data and QA accounts are not shipped.
- Bridge transport checked against an isolated WHMCS model fixture: HMAC authentication, invalid signature rejection, replay rejection, allowlisted actions, missing invoice response, snapshot normalization, currency metadata, and PDF-header transport response. This does **not** validate actual WHMCS PDF generation.

## Automated suite coverage

1. Decimal-string monetary arithmetic, rounding, and invalid values.
2. Known GSTIN checksum vector, state-code and format checks.
3. Regex boundaries and case normalization.
4. Current-profile evidence remains flagged.
5. Historical snapshot takes precedence over changed client details.
6. Supplier GSTIN exclusion.
7. Conflicting and malformed recipient IDs.
8. Tax amounts independent of GSTIN presence.
9. API count drift detection.
10. Repeated/overlapping API ID detection.
11. Partial transaction response rejection.
12. WHMCS flattened credit-log normalization.
13. Encrypted credential round trip and malformed ciphertext rejection.
14. Idempotent invoice import and exact balance.
15. Refund and applied-credit treatment.
16. Cancelled invoice balance handling.
17. Complete client import with unallocated receipts and wallet history.
18. Reconstructed opening balances.
19. Failed-record visibility and successful retry.
20. Mass-pay/add-funds exclusion from sales.
21. CSV formula-escape handling and exact amount output.
22. Escaped HTML invoice content.
23. Resumable ZIP with copies and manifest.
24. Invalid date/range rejection.
25. Staged payment-journal import and stage cleanup.
26. Deleted cache entries reconciled after complete date sync.
27. GST summaries keep evidence and currencies explicit.
28. Client API passwords and unrelated custom fields are discarded.
29. Streaming ledger CSV with exact running balance.
30. Overlapping active-job rejection.
31. Bulk PDF scan fails explicitly when text extraction is not configured.

## Live integration checks still required

No live WHMCS URL/credentials or cPanel account was supplied for this build. The following cannot be represented as verified:

- API authentication, role permissions, and IP allowlisting on your WHMCS.
- Native MySQL/MariaDB read-only grants and the actual installed WHMCS schema.
- API-vs-database parity on your invoice/payment data.
- Your WHMCS PDF renderer, custom template, ionCube/PHP combination, and snapshot layout.
- Actual pdftotext execution against your PDFs (including image-only/template differences).
- Runtime resource usage at your invoice volume or CloudLinux limits.
- Apache/LiteSpeed access rules, file ownership, HTTPS/proxy configuration, cron execution, backup/restore on your cPanel host.

## Recommended first live comparison

Use a single known client with: a paid invoice, partial payment, refund, applied wallet credit, an unallocated receipt, and a changed GSTIN. Compare source invoice count, amounts, taxes, payment IDs, current balances, and wallet movements. Download an original PDF and compare it with WHMCS. Confirm supplier-only GSTINs are not treated as recipient IDs. Then run a complete month in both modes if available, compare CSVs, and proceed to historical exports.

Performance is a design goal, not an unmeasured benchmark: indexed SQLite cache, bounded worker units, short client caching, staged payments, keyset database scans, and streaming CSV/ledger queries are implemented. Real-host measurements remain necessary.
