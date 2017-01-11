<?php

namespace App\Model;

use Framework\Model\AbstractModel;

class News extends AbstractModel
{
    const TABLE = 'news';

    public $options = [
        'image' => '',
        'title' => '',
        'description' => '',
        'text' => ''
    ];

    /**
     * @return string
     */
    public function getTable()
    {
        return self::TABLE;
    }

    /**
     * @return array
     */
    public function getOptions()
    {
        return $this->options;
    }
}
