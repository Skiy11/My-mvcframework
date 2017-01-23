<?php

namespace App\Model;

use Framework\Model\AbstractModel;

class Comments extends AbstractModel
{
    const TABLE = 'comments';

    public $options = [
        'text' => '',
        'news_id' => ''
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
