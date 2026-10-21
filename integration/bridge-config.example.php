<?php
declare(strict_types=1);
// Save as /home/CPANELUSER/private/invoicedesk-bridge-config.php (outside public_html).
return [
    'secret' => 'REPLACE_WITH_A_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS',
    'whmcs_root' => '/home/CPANELUSER/public_html/whmcs',
    'private_dir' => '/home/CPANELUSER/private/invoicedesk-bridge-data',
    'allow_ips' => [], // Optional exact IPv4/IPv6 allowlist; never trust X-Forwarded-For.
    'require_https' => true,
    'pdf_adapter' => '', // Optional absolute PHP file returning function(int $invoiceId): string.
    'snapshot_adapter' => '', // Optional absolute PHP file returning function($invoice): ?array.
];
