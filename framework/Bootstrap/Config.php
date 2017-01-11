<?php

namespace Framework\Bootstrap;

class Config
{
    /**
     * @var array
     */
    protected static $routes;

    /**
     * @return array
     */
    public static function getRoutes()
    {
        if (!self::$routes) {
            self::$routes = require_once self::getConfigDir() . 'routes.php';
        }

        return self::$routes;
    }

    protected static function getConfigDir()
    {
        return getcwd()
            . DIRECTORY_SEPARATOR
            . 'app'
            . DIRECTORY_SEPARATOR
            . 'config'
            . DIRECTORY_SEPARATOR;
    }
}
