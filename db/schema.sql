DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
	id INT PRIMARY KEY AUTO_INCREMENT,
	burger_name VARCHAR(50) NOT NULL,
	devoured BOOLEAN NOT NULL,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);