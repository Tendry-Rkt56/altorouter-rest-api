<?php

namespace App\Controller\Api;

use App\Controller\Controller;
use App\Entity\Article;

class ArticleController extends Controller
{

     public function index(array $data = [])
     {
          $articles = $this->manager->getEntity(Article::class)->all($data);
          return $this->json($articles);
     }

     public function delete()
     {
          $id = $this->getData()->id;
          $delete = $this->manager->getEntity(Article::class)->delete($id);
          return $this->json(['response' => $delete]);
     }

}