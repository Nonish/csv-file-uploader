CREATE DATABASE users;
use users;

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone  VARCHAR(15),
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);