<?php

use App\Container;
use App\Controller\Api\ArticleController;
use App\Controller\View\ArticleController as ViewArticleController;

require_once '../vendor/altorouter/altorouter/AltoRouter.php';

$router = new AltoRouter();

$container = new Container();

$router->map('GET', '/', fn () => $container->getController(ViewArticleController::class)->index());
$router->map('GET', '/articles/create', fn () => $container->getController(ViewArticleController::class)->create());
$router->map('GET', '/articles/edit', fn () => $container->getController(ViewArticleController::class)->edit($_GET));

//---Routes pour les api

$router->map('GET', '/api/articles', fn () => $container->getController(ArticleController::class)->index($_GET));
$router->map('GET', '/api/articles/find', fn () => $container->getController(ArticleController::class)->edit($_GET));
$router->map('POST', '/api/articles/update', fn () => $container->getController(ArticleController::class)->update());
$router->map('POST', '/api/articles/create', fn () => $container->getController(ArticleController::class)->create());
$router->map('POST', '/api/articles/delete', fn () => $container->getController(ArticleController::class)->delete());

//---Routes pour les api


$match = $router->match();
if ($match !== null) {
     if (is_callable($match['target'])){
         call_user_func_array($match['target'], $match['params']);
     }
}