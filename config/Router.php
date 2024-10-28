<?php

use App\Container;
use App\Controller\Api\ArticleController;
use App\Controller\View\ArticleController as ViewArticleController;

require_once '../vendor/altorouter/altorouter/AltoRouter.php';

$router = new AltoRouter();

$container = new Container();

$router->map('GET', '/articles', fn () => $container->getController(ViewArticleController::class)->index());

$router->map('GET', '/api/articles', fn () => $container->getController(ArticleController::class)->index());


$match = $router->match();
if ($match !== null) {
     if (is_callable($match['target'])){
         call_user_func_array($match['target'], $match['params']);
     }
}