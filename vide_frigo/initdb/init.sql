CREATE DATABASE IF NOT EXISTS vide_frigo;
Use vide_frigo;

CREATE TABLE User (
  id bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  login varchar(50) NOT NULL,
  password varchar(512) NOT NULL,
  email	VARCHAR(100)	NOT NULL,
  description VARCHAR(1000),
  photo VARCHAR(512),
	UNIQUE (login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE Ingredient (
  name varchar(50) NOT NULL PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE Recipe (
  id bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name_creator varchar(50) NOT NULL,
  name varchar(100) NOT NULL,
  picture VARCHAR(512),
  preparation_time varchar(50) NOT NULL,
  steps varchar(2000) NOT NULL,
  category enum('STARTER','DISH','DESSERT') NOT NULL,
	mark float,
  nb_vote bigint(20),
	FOREIGN KEY (name_creator) REFERENCES User(login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE Comment (
  id bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_recipe bigint(20) NOT NULL,
  id_user bigint(20) NOT NULL,
  message varchar(1000) NOT NULL,
	star float NOT NULL,
	FOREIGN KEY (id_recipe) REFERENCES Recipe(id),
	FOREIGN KEY (id_user) REFERENCES User(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE Recipe_Ing (
  id_recipe bigint(20),
  name_ing VARCHAR(50),
	FOREIGN KEY (id_recipe) REFERENCES Recipe(id) ON DELETE CASCADE,
	FOREIGN KEY (name_ing) REFERENCES Ingredient(name),
	PRIMARY KEY (id_recipe, name_ing)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE Favorite (
  id_user VARCHAR(50),
  id_recipe bigint(20),
	FOREIGN KEY (id_user) REFERENCES User(login) ON DELETE CASCADE,
	FOREIGN KEY (id_recipe) REFERENCES Recipe(id),
	PRIMARY KEY (id_user, id_recipe)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
