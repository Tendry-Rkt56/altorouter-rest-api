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

     public function create()
     {
          $data = $this->getData(true);
          $create = $this->manager->getEntity(Article::class)->create($data);
          return $this->json(['response' => $create]);
     }

     public function edit(array $data = [])
     {
          $id = $data['id'];
          $article = $this->manager->getEntity(Article::class)->find($id);
          return $this->json(['article' => $article]);
     }

     public function update()
     {
          $data = $this->getData(true);
          $id = $data['id'];
          $update = $this->manager->getEntity(Article::class)->update($id, $data);
          return $this->json(['response' => $update]);
     }

     public function delete()
     {
          $id = $this->getData()->id;
          $delete = $this->manager->getEntity(Article::class)->delete($id);
          return $this->json(['response' => $delete]);
     }

}