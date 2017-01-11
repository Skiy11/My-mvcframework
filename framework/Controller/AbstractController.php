<?php

namespace Framework\Controller;

use Framework\View\View;

class AbstractController
{
    protected $view;

    public function __construct()
    {
        $this->view = new View();
    }
}
