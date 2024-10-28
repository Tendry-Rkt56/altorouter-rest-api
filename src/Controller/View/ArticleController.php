<?php

namespace App\Controller\View;

use App\Controller\Controller;

class ArticleController extends Controller
{

     public function index()
     {
          return $this->render('articles.index');
     }

}