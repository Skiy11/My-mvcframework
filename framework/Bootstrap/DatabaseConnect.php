<?php

namespace Framework\Bootstrap;

class DatabaseConnect
{
    private static $instance = null;

    /**
     * @var array
     */
    protected $config;

    /**
     * @var \PDO
     */
    private static $connection;

    protected function __construct()
    {
        $this->config = Config::getConfig();

        try {
            self::$connection = new \PDO(
                'mysql:host=' . $this->config['host'] . ';dbname=' . $this->config['DBName'],
                $this->config['user'],
                $this->config['pass']
            );
            self::$connection->exec('SET CHARACTER SET utf8');
        } catch (\PDOException $e) {
            echo 'Ошибка подключения к базе данных: '.$e->getMessage();
        }
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new DatabaseConnect();
        }
        return self::$instance;
    }

    /**
     * @return \PDO
     */
    public static function getConnection()
    {
        return self::$connection;
    }

    private function __sleep()
    {
    }

    private function __wakeup()
    {
    }
}
