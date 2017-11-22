## Requêtes SQL (liste non exhaustive)

**Tables**

INSERT INTO **ingredient** (ID, nom) VALUES ('','');*  
INSERT INTO **recette** (ID, nom, descrition, membre,,) VALUES ...;  
INSERT INTO **rec_ing** (recetteID, ingredientID) VALUES ('','');   
INSERT INTO **user** (login, passwd, age, picture) VALUES ...;  
INSERT INTO **favori** (userID, recetteID) VALUES ...;  
INSERT INTO **commentaire** (userID, recetteID, contenu) VALUES ...;*

**Séléctions**


* SELECT name FROM ingredient WHERE name LIKE 'var%';  
**Barre de recherche de recettes par ingrédients, liste dynamique**

* SELECT \* FROM recette WHERE type = vartype AND id IN ( SELECT recetteID FROM rec_ing WHERE
  ((ingredientID = 'ing1') OR (ingredientID = 'ing2')) GROUP BY recetteID
  having count(ingredientID) = nbIngr
);   
**Liste des recettes en fonction du type de plat et de la liste d'ingrédients spécifiés**

* SELECT login FROM user WHERE login = 'varlogin';  
**Vérifier l'existence du login lors de l'inscription**

* SELECT \* FROM user WHERE login = 'varlogin' AND passwd = 'varpass';  
**Recherche utilisateur lors de la connexion**

* SELECT \* FROM recette WHERE membre = 'varmember';  
**Liste des recettes postées par un membre**

* SELECT \* FROM favori WHERE userID = 'varmembre';  
**Liste des favoris d'un membre**

* SELECT \* FROM commentaire WHERE recetteId = 'varrecette';  
**Liste des commentaires d'une recette**

* SELECT \* FROM commentaire WHERE userID = 'varmembre';  
**Liste des commentaires postés par un membre**
