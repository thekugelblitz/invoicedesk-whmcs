<?php
// Copy to config.php, put the app directory outside public_html, expose only public/.
return [
    'storage' => __DIR__ . '/var',
    'setup_token' => 'REPLACE_WITH_YOUR_OWN_RANDOM_32_OR_MORE_CHARACTERS',
    'require_https' => true,
    'timezone' => 'Asia/Kolkata',
    'session_minutes' => 30,
    'pdftotext' => '', // Optional absolute executable path, e.g. /usr/bin/pdftotext
];
