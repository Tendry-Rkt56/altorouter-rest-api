<?php

use Config\DataBase;

class Entity
{

     public function __construct(protected DataBase $db)
     {
          
     }

}