<?php

namespace App\Controller;

use App\Entity\Article;

class ArticleController extends Controller
{

     public function index(array $data = [])
     {
          $articles = $this->manager->getEntity(Article::class)->all($data);
          return $this->json($articles);
     }

}