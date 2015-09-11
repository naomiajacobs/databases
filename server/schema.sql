CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int(3) NOT NULL auto_increment,
  message varchar(140) NOT NULL,
  user int(3) NOT NULL,
  room int(3) NOT NULL,
  PRIMARY KEY(id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id int(3) NOT NULL auto_increment,
  username varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE rooms (
  id int(3) NOT NULL auto_increment,
  roomname varchar(30) NOT NULL,
  PRIMARY KEY(id)
);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

