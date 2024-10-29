<?php

namespace App\Controller\View;

use App\Controller\Controller;

class ArticleController extends Controller
{

     public function index()
     {
          return $this->render('articles.index');
     }

     public function create()
     {
          return $this->render('articles.create');
     }

     public function edit(array $data = [])
     {
          return $this->render('articles.edit');
     }

}