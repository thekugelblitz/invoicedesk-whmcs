# Munshi Ji v1.1 upgrade

Back up your installation first. Replace application source files with this release. Keep your existing config.php and entire configured private storage directory, especially invoicedesk.sqlite and master.key. Keep integration/bridge-config.php. No reinstall or new administrator is required. New tracking tables are created automatically on the next request. Hard refresh the browser after uploading.

## Database connection errors and logs

Open Settings → Connection, then retry Test & save. Errors now show a specific cause and next step. Open Settings → Diagnostics to search its reference and check PHP extensions and storage permissions.

The app creates `<configured storage>/logs/application.jsonl` with private permissions, rotating once at 2 MiB. The default location is `var/logs/application.jsonl` inside the private app directory. It also sends the reference to PHP's server error log as a fallback. Logs do not include submitted configuration bodies, passwords or stack arguments. Diagnostics is administrator-only.

References produced before this logger was installed (including 3f6a99f89a44) cannot be recovered from the new log. Reproduce the error after updating. Your host may still have the old entry in its PHP server log.

- Missing PDO MySQL: enable pdo_mysql in the PHP extensions for the domain's active PHP version.
- MySQL 1045: check the full account-prefixed username and password.
- MySQL 1049: check the full account-prefixed WHMCS database name.
- MySQL 1044 / 1142: add the database user to the database with SELECT permission.
- MySQL 2002 socket failure: try 127.0.0.1 instead of localhost; confirm the MySQL host with your provider.
- Remote connection failures: check Remote Database Access and firewall rules.

Do not share database passwords, config.php, master.key, or the complete private storage folder. If further help is needed, share only the new error message and SQLSTATE / MySQL code.

## Download register

Invoice downloads are the default screen. Every completed original PDF response records the time, person, repeat count and source version. A completed ZIP response records only its successful invoice members. Creating a ZIP, viewing a preview, exporting CSV or downloading HTML copies does not clear pending original PDFs. HTML downloads have a separate history.

Use Not touched, Downloaded, Updated since download, or Pending + updated filters. Click a count card to filter. CSV invoice exports include download status and version freshness. Each invoice has its own download history, and the Download history page shows team activity.

Tracking starts with this release and covers this installation. It cannot reconstruct earlier downloads or observe files downloaded directly through WHMCS. “Served” confirms completion of the server response; it cannot confirm that a browser saved a file to disk. Keep the same database and master key across upgrades to retain history.
