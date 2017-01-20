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
     * @param array $queryParts
     * @return $this
     */
    public function where(array $queryParts)
    {
        $where = 'WHERE ';
        $total = count($queryParts);
        $counter = 0;

        foreach ($queryParts as $key => $value) {
            $counter++;
            if ($counter == $total) {
                $where .= $key . "='$value' ";
            } else {
                $where .= $key . "='$value' AND ";
            }
        }

        $this->queryStorage['where'] = $where;
        return $this;
    }

    /**
     * @param array $queryParts
     * @param string $sort
     * @return $this
     */
    public function orderBy(array $queryParts, $sort = 'ASC')
    {
        $orderBy = 'ORDER BY ';
        $total = count($queryParts);
        $counter = 0;

        foreach ($queryParts as $value) {
            $counter++;
            if ($counter == $total) {
                $orderBy .= $value . ' ' . $sort . ' ';
            } else {
                $orderBy .= $value . ', ';
            }
        }

        $this->queryStorage['orderBy'] = $orderBy;
        return $this;
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return $this
     */
    public function setLimit($limit, $offset = 0)
    {
        $limitValue = 'LIMIT ' . $limit;

        if ($offset != 0) {
            $limitValue .= ', ' . $offset;
        }

        $this->queryStorage['limit'] = $limitValue;
        return $this;
    }

    /**
     * @return object
     */
    public function read()
    {
        $select = 'SELECT * FROM ' . $this->getTable() . ' ';

        if (isset($this->queryStorage['where'])) {
            $select .= $this->queryStorage['where'];
        }
        if (isset($this->queryStorage['orderBy'])) {
            $select .= $this->queryStorage['orderBy'];
        }
        if (isset($this->queryStorage['limit'])) {
            $select .= $this->queryStorage['limit'];
        }

        $query = $this->connection->prepare($select);
        $query->execute();
        $this->objectPDO = $query->fetchAll(\PDO::FETCH_OBJ);

        return $this->objectPDO;
    }

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

    /**
     * @param array $queryParts
     * @return bool
     */
    public function update(array $queryParts)
    {
        $total = count($queryParts);
        $counter = 0;
        $update = 'UPDATE ' . $this->getTable() . ' SET ';

        foreach ($queryParts as $key => $value) {
            $counter++;
            if ($counter == $total) {
                $update .= $key . "='$value' ";
            } else {
                $update .= $key . "='$value', ";
            }
        }

        if (isset($this->queryStorage['where'])) {
            $update .= $this->queryStorage['where'];
        }

        $query = $this->connection->prepare($update);
        return $query->execute();
    }

    /**
     * @return bool
     */
    public function delete()
    {
        $delete = 'DELETE FROM ' . $this->getTable() . ' ';

        if (isset($this->queryStorage['where'])) {
            $delete .= $this->queryStorage['where'];
        }

        $query = $this->connection->prepare($delete);
        return $query->execute();
    }
}
