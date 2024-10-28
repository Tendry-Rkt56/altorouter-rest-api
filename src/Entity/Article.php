<?php

namespace App\Entity;

class Article extends Entity
{

     public function all(array $data = [])
     {
          $sql = "SELECT * FROM articles WHERE id > 0";
          if (isset($data['search'])) {
               $sql .= " AND articles.name LIKE '%$data[search]'";
          }
          if (isset($data['price'])) {
               $sql .= " AND articles.price <= '%$data[price]'";
          }
          $articles = $this->db->getConn()->query($sql);
          return $articles->fetchAll(\PDO::FETCH_OBJ);
     }

     public function create(array $data = [])
     {
          $query = "INSERT INTO articles (name, price) VALUES (:name, :price)";
          $result = $this->db->getConn()->prepare($query);
          extract($data);
          $result->bindValue(':name', $nom, \PDO::PARAM_STR);
          $result->bindValue(':price', $prix, \PDO::PARAM_INT);
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