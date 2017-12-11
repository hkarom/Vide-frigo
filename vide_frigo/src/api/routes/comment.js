let express = require('express');
let bd = require('./db');
let router = express.Router();

function treatment(err, response, values,  rows) {
	if(err) response.status(400).send(values);
	else {
		if (rows.length != 0) {
			values.push({'result' : 'success', 'data' : rows});
		} else {
			values.push({'result' : 'error', 'msg' : 'No Results Found'});
		}
		response.setHeader('Content-Type', 'application/json');
		response.status(200).send(JSON.stringify(values));
	}
};

/**
	*@swagger
	* /comment
	* get:
	* 	description: Retourne les commentaires associé à la recette @recipeID
	* 	tags:
	*				- comment
	*		produces:
	*		- application/json
	*		responses:
	*		- description: comment
*/

router.get('/comment/:recipeID', (req, res) => {
	bd.query('SELECT * FROM avis WHERE id_recette = ?',[req.params.recipeID], (err,cols) => {
		let values = [];
		console.log('request GET recipe');
    treatment(err,res,values,cols);
	});
});

/**
	*@swagger
	* /comment
	* post:
	* 	description: Ajoute un commentaire dans la base de données
	* 	tags:
	*				- comment
	*		produces:
	*		- application/json
	*		responses:
	*		- description: recipes
*/

router.post('/comment/:userID/:recipeID', (req, res) => {
	let values = [];
	if( typeof req.body.message !== 'undefined' && typeof req.body.etoile !== 'undefined'){
		bd.query('INSERT INTO avis VALUES (?,?,?,?)',[req.params.userID, req.params.recipeID,req.body.message,req.body.etoile], (err,result) => {
				treatment(err,res,values,'succes');
		});
	}
	else {
		values.push({'result' : 'error', 'msg' : 'Missing field'});
		res.setHeader('Content-Type', 'application/json');
		res.send(200, JSON.stringify(values));
	}
});

/**
	*@swagger
	* /comment
	* patch:
	* 	description: Edite un commentaire dans la base de données
	* 	tags:
	*				- comment
	*		produces:
	*		- application/json
	*		responses:
	*		- description: recipes
*/


router.patch('/comment/:userID/:recipeID/:commentID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('UPDATE avis SET message = ? etoile = ?
							WHERE id_user = ? AND id_recette = ? AND id_avis = ?',
							[req.body.message, req.body.etoile, req.params.userID, req.params.recipeID, req.params.commentID], (err,result) => {
								let values = [];
					      treatment(err,res,values,"success");
		});
});
/**
	*@swagger
	* /recipes
	* delete:
	* 	description: Supprime la recette associé à @id
	* 	tags:
	*				- Recipes
	*		produces:
	*		- application/json
	*		responses:
	*		- description: recipes
*/
router.delete('/comment/:userID/:recipeID/:commentID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('DELETE * FROM avis where id_user = ? AND id_recette = ? AND id_avis = ?',[req.params.userID, req.params.recipeID, req.params.commentID], (err,result) => {
				if(err) throw err;
				else {
					let values = [];
		      treatment(err,res,values,"success");
				}
		});
});

module.exports  = router;
