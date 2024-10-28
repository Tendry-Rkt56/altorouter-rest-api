<?php

use App\Container;
use App\Controller\ArticleController;

require_once '../vendor/altorouter/altorouter/AltoRouter.php';

$router = new AltoRouter();

$container = new Container();

$router->map('GET', '/api/articles', fn () => $container->getController(ArticleController::class)->index());


$match = $router->match();
if ($match !== null) {
     if (is_callable($match['target'])){
         call_user_func_array($match['target'], $match['params']);
     }
}