<?php

namespace App\Controller;

use Framework\Controller\AbstractController;

class IndexController extends AbstractController
{
    public function index()
    {
        $this->view->renderView('theme.phtml');
    }
}
