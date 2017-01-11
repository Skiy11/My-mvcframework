<?php

namespace Framework\Model;

use Framework\Bootstrap\DatabaseConnect;

abstract class AbstractModel
{
    /**
     * @var \PDO
     */
    protected $connection;

    /**
     * @var array
     */
    public $queryStorage = array();

    /**
     * @var object
     */
    public $objectPDO;

    public function __construct()
    {
        $dbConnect = DatabaseConnect::getInstance();
        $this->connection = $dbConnect::getConnection();
    }

    /**
     * @return string
     */
    abstract public function getTable();

    /**
     * @return mixed
     */
    abstract public function getOptions();

    /**
     * @return bool
     */
    public function save()
    {
        $total = count($this->getOptions());
        $counter = 0;
        $insert = 'INSERT INTO ' . $this->getTable() . ' (';

        foreach ($this->getOptions() as $key => $value) {
            $counter++;
            if ($counter == $total) {
                $insert .= $key . ') VALUES (';
                $counter = 0;
            } else {
                $insert .= $key . ', ';
            }
        }

        foreach ($this->getOptions() as $key => $value) {
            $counter++;
            if ($counter == $total) {
                $insert .= '\'' . $value . '\'' . ') ';
                $counter = 0;
            } else {
                $insert .= '\'' . $value . '\'' . ', ';
            }
        }

        $query = $this->connection->prepare($insert);
        return $query->execute();
    }
}
