<?php

namespace App\Entity;

use Services\DataBase;

class Entity
{

     public function __construct(protected DataBase $db)
     {
          
     }

}