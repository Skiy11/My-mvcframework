<?php

use Framework\Bootstrap\Router;

/*
 * xdebug substitutes in __DIR__ its value
 */
$dirName = __DIR__;

chdir(realpath($dirName . '/..'));

require_once realpath(getcwd() . '/vendor/autoload.php');

$router = new Router();
$router->run();
