<?php

namespace App\Controller;

use App\Manager;

class Controller 
{


     public function __construct(protected Manager $manager)
     {
          if (session_status() == PHP_SESSION_NONE) session_start();

     }

     public function getData(bool $associative = false)
     {
          $data = file_get_contents('php://input');
          return json_decode($data, $associative);
     }

     public function json(array $data)
     {
          echo json_encode($data);
          header("Content-Type : application/json");
     }

     public function render(string $view)
     {
          $vue = "../templates/".str_replace('.','/', $view).'.html';
          require_once $vue;
     }

}