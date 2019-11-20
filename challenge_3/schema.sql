DROP DATABASE IF EXISTS db;
CREATE DATABASE db;

USE db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(20),
  password VARCHAR(20),
  phone INT,
  shipping_address JSON,
  billing_address JSON
  credit_card JSON
);
