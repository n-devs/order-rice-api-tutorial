-- create database
CREATE DATABASE ORDER_RICE;

-- create table

CREATE TABLE Users (
   id INT NOT NULL AUTO_INCREMENT,
   name text,
   email varchar(255),
   password text,
   PRIMARY KEY(id)
) ENGINE=INNODB;


CREATE TABLE Products (
   id INT NOT NULL AUTO_INCREMENT,
   name text,
   price INT(4),
   PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE Orders (
   id INT NOT NULL AUTO_INCREMENT,
   product_id INT,
   user_id INT,
   PRIMARY KEY(id),
   INDEX (product_id),
   INDEX (user_id),
   FOREIGN KEY (product_id)
      REFERENCES Products(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (user_id)
      REFERENCES Users(id)
      ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;

CREATE TABLE Tokens (
   id INT NOT NULL AUTO_INCREMENT,
   user_id INT,
   token text,
   PRIMARY KEY(id),
   INDEX (user_id),
    FOREIGN KEY (user_id)
      REFERENCES Users(id)
      ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;

-- show item
-- user
SELECT * FROM Users;

-- tokens
SELECT * FROM Tokens;

-- products
SELECT * FROM Products;

-- orders
SELECT Orders.id as order_id, Products.id as product_id, Products.name, Products.price 
FROM Orders 
LEFT JOIN Products ON Orders.products_id = Products.id 
GROUP BY Orders.id,Products.id
ORDER BY RAND() DESC