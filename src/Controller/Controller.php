<?php

use App\Manager;

class Controller 
{


     public function __construct(private Manager $manager)
     {
          if (session_status() == PHP_SESSION_NONE) session_start();
     }

}