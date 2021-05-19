CREATE DATABASE node_mysql_passport;

USE node_mysql_passport;

CREATE TABLE user
(
	userID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL
)