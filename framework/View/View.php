<?php

namespace Framework\View;

class View
{
    public function renderView($template, $data = null)
    {
        require_once getcwd()
            . DIRECTORY_SEPARATOR
            . 'app'
            . DIRECTORY_SEPARATOR
            . 'View'
            . DIRECTORY_SEPARATOR
            . 'Template'
            . DIRECTORY_SEPARATOR
            . $template;
    }
}
