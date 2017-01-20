<?php

namespace Framework\Bootstrap;

class Router
{
    private $routes;

    function __construct()
    {
        $this->routes = Config::getRoutes();
    }

    public function run()
    {
        $uri = '';
        if (!empty($_SERVER['REQUEST_URI'])) {
            $uri = trim($_SERVER['REQUEST_URI'], '/');
        }

        $output = '';
        foreach ($this->routes as $pattern => $route) {
            if (preg_match("#$pattern#", $uri)){
                $internalRoute = preg_replace("#$pattern#", $route, $uri);
                $segments = explode('/', $internalRoute);
                $controllerClass = '\\App\\Controller\\' . ucfirst(array_shift($segments)) . 'Controller';
                $action = array_shift($segments);
                $parameters = $segments;

                if (!is_callable(array($controllerClass, $action))){
                    $this->error404();
                }

                $controller = new $controllerClass();
                ob_start();
                call_user_func_array(array($controller, $action), $parameters);
                $output = ob_get_clean();
                break;
            }
        }

        echo $output;
    }

    function error404()
    {
        $host = 'http://'.$_SERVER['HTTP_HOST'].'/';
        header('HTTP/1.1 404 Not Found');
        header("Status: 404 Not Found");
        header('Location:'.$host.'404');
        die();
    }
}
