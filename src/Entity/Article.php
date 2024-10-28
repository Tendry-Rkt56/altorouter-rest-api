<?php

namespace App\Entity;

class Article extends Entity
{

     public function all(array $data = [])
     {
          $sql = "SELECT * FROM articles WHERE id > 0";
          if (isset($data['search'])) {
               $search = $this->db->getConn()->quote('%'.$data['search'].'%');
               $sql .= " AND name LIKE $search";
          }
          if (isset($data['price'])) {
               $sql .= " AND price <= '%$data[price]'";
          }
          // return ['id' => 1, 'name' => $sql];
          $articles = $this->db->getConn()->query($sql);
          return $articles->fetchAll(\PDO::FETCH_OBJ);
     }

     public function create(array $data = [])
     {
          $query = "INSERT INTO articles (name, price) VALUES (:name, :price)";
          $result = $this->db->getConn()->prepare($query);
          extract($data);
          $result->bindValue(':name', $name, \PDO::PARAM_STR);
          $result->bindValue(':price', $price, \PDO::PARAM_INT);
          return $result->execute();
     }

     public function update (int $id, array $data = []): bool
     {
          $query = "UPDATE articles SET name = :name, prix = :price WHERE id = :id";
          $result = $this->db->getConn()->prepare($query);
          extract($data);
          $result->bindValue(":name", $nom, \PDO::PARAM_STR);
          $result->bindValue(":price", $prix, \PDO::PARAM_INT);
          $result->bindValue(":id", $id, \PDO::PARAM_INT);
          return $result->execute();
     }

     public function delete(int $id)
     {
          $query = "DELETE FROM articles WHERE id = :id";
          $result = $this->db->getConn()->prepare($query);
          $result->bindValue(":id", $id, \PDO::PARAM_INT);
          return $result->execute();
     }



}