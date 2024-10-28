<?php

namespace App\Controller;

use App\Manager;

class Controller 
{


     public function __construct(protected Manager $manager)
     {
          if (session_status() == PHP_SESSION_NONE) session_start();

     }

     public function json(array $data)
     {
          echo json_encode($data);
          header("Content-Type : application/json");
     }

}