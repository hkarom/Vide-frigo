# Prépa routes swagger

Route de base : `/api`
* `/signup` :
	* **POST** : Créer un utilisateur
		* Données : JSON
		* résultats : JSON

* `/login` :
	* **POST** : Connexion utilisteur
* `/user` :
	* **POST** : Récupèrer les données d'un utilisateur
	* Données : JSON
	* résultats : JSON
	* **PATCH** : Modifier les données d'un utilisateur
		* Données : JSON
		* Résultats : JSON
	* **DELETE** : Suppression d'un utilisateur
		* Données : JSON
		* Résultats : JSON
* `/recipe` :
	* **POST** : Création d'une nouvelle recette
		* Données : JSON
		* Résultats : JSON
* `/recipe/:id` :
	* *id* : identifiant de la recette
	* **GET** : Récupèrer les données d'une recette
		* Résultats : JSON
	* **PATCH** : Modifier une recette
		* Données : JSON
		* Résultats : JSON
	* **DELETE** : Supprimer une recette
		* Résultats : JSON
* `/user/:id` :
* *id* : identifiant de l'utilisateur
* **POST** : Récupèrer les données d'un utilisateur
	* Données : JSON
	* Résultats : JSON
* **PATCH** : Modifier le profile d'un utilisateur
	* Données : JSON
	* Résultats : JSON
* **DELETE** : Supprimer un utilisateur
	* Données : JSON
	* Résultats : JSON
* `/ingredients` :
	* **POST** : Retourne la liste des ingrédients possible
		* Données : JSON
			* entrée de l'utilisateur : string
		* Résultats : JSON
* `/favorite/:userID` :
	* *userID* : identifiant de l'utilisateur auquel appartient le favori
	* **GET** : Récupèrer la liste des favoris de l'utilisateur
		* Résultats : JSON
	* **POST** : Création d'un nouveau favori
		* Données : JSON
		* Résultats : JSON
* `/favorite/:userID/:favID` :
	* *userID* : identifiant de l'utilisateur auquel appartient le favori
	* *favID* : identifiant du favori
	* **GET** : Séléctionner un favori -> une recette
		* Résultats : JSON
	* **DELETE** : supprimer un favori
		* Résultats : JSON
* `/comment/:userID/:recipeID` :
	* *userID* : identifiant de l'utilisateur voulant créer un commentaire
	* *recipeID* : identifiant de la recette concernée
	* **POST** : Créer un commentaire
		* Données : JSON
		* Résultats : JSON
* `/comment/:recipeID` :
	* *recipeID* : identifiant de la recette concernée
	* **GET** : Récupèrer les commentaires d'une recette
		* Résultats : JSON
* `/comment/:id/:userID/:recipeID` :
	* *id* : identifiant du commentaire
	* *userID* : identifiant de l'utilisateur voulant créer un commentaire
	* *recipeID* : identifiant de la recette concernée
	* **PATCH** : Modifier un commentaire
		* Données : JSON
		* Résultats : JSON
	* **DELETE** : Supprimer un commentaire
		* Résultats : JSON
