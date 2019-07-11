<?php

$htmlPaths = [
    'FONTS' => '/resources/fonts',
    'LIB' => '/resources/lib'
];

//paths to commonly accessed directiories
$phpPaths = [
    'PHP' => $_SERVER['DOCUMENT_ROOT'] . '/../private/php',
    'API' => $_SERVER['DOCUMENT_ROOT'] . '/resources/api'
];

//database credentials
require_once($_SERVER['DOCUMENT_ROOT'] . '/../private/config/database.php');