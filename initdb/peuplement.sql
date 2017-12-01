/**INSERT**/
/*insertion dans la tabe inréingredient*/
INSERT INTO ingredients (nom_ingredient) VALUES ('nom_ingredient');
/*insertion dans la table recette*/
INSERT INTO recettes ( nom_recette, description_recette, photo_recette, temps_cuisson, temps_prepa, etapes, catégorie,id_user)
VALUES ( 'nom_rec', 'desc_rec ', 'photo_rec', '04:07:00', '06:07:00', 'etape-rec', 'PLAT','id_us');
/*insertion dans la tabe user*/
INSERT INTO users ( login, password, age, apropos, photo) VALUES ( 'login_u', 'passwd_u', 'age_u', 'apropos_u', '');
/*insertionn dans la table favoris*/
INSERT INTO favoris (id_user, id_recette) VALUES ('id_us','id_rec');
/*insertion dans la tabe avis*/
INSERT INTO avis(id_recette, id_user, message, etoile) VALUES ('id_rec', 'id_us', 'avis','note');
/*insertion dans la table  rec_ing*/
INSERT INTO rec_ing(id_recette, id_ingredient) VALUES ('id_rec','id_ing');

/**SELECT**/
/*Barre de recherche de recettes par ingrédients, liste dynamique*/
SELECT nom_ingredient FROM ingredients WHERE nom_ingredient LIKE 'ingredient';
/*Liste des recettes en fonction du type de plat et de la liste d'ingrédients spécifiés*/
SELECT * FROM recettes, rec_ing WHERE catégorie='type' AND recettes.id_recette=rec_ing.id_recette GROUP BY rec_ing.id_recette HAVING COUNT(rec_ing.id_ingredient='nbing');
/*Vérifier l'existence du login lors de l'inscription*/
SELECT login FROM users WHERE login = 'varlogin';
/*Recherche utilisateur lors de la connexion*/
SELECT * FROM users WHERE login = 'varlogin' AND password = 'varpass';
/*Liste des recettes postées par un membre*/
SELECT * FROM recettes WHERE id_user = 'varmember';
/*Liste des commentaires d'une recette*/
SELECT * FROM avis WHERE id_recette = 'varrecette';
/*Liste des commentaires postés par un membre*/
SELECT * FROM avis WHERE id_user = 'varmembre';
