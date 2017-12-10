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
	* /recipes
	* get:
	* 	description: Retourne les recttes d'un utilisateur
	* 	tags:
	*				- Recipes
	*		produces:
	*		- application/json
	*		responses:
	*		- description: recipes
*/

router.get('/recipes/:userID', (req, res) => {
		bd.query('SELECT * FROM Recipe WHERE id_user = ?',[req.params.userID], (err,cols) => {
			let values = [];
			treatment(err,res,values,cols)
		})
});

/**
	*@swagger
	* /recipes
	* post:
	* 	description: Ajoute une recette dans la base de données
	* 	tags:
	*				- Recipes
	*		produces:
	*		- application/json
	*		responses:
	*		- description: recipes
*/
router.post('/recipes/:userID', (req, res) => {
		let values = [];
		if(typeof req.body.nom_recette !== 'undefined'){
		bd.query('INSERT INTO Recipe values ()',[req.params.userID], (err,result) => {
			treatment(err,result,values,"success")
		});
	}
	else{
		values.push({'result' : 'error', 'msg' : 'Missing field'});
		res.setHeader('Content-Type', 'application/json');
		res.send(200, JSON.stringify(values));
	}
});

/**
	*@swagger
	* /recipes
	* get:
	* 	description: Retourne la recette associé à @id
	* 	tags:
	*				- Recipes
	*		produces:
	*		- application/json
	*		responses:
	*		- description: recipes
*/

router.get('/recipe/:id', (req, res) => {
	let values = [];
		bd.query('SELECT * FROM Recipe WHERE id = ?',[req.params.id], (err,cols) => {
				treatment(err,result,values,cols);
		})
});

router.patch('/recipe/:id', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('UPDATE ... WHERE id = ?',[req.params.id], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
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

router.delete('/recipe/:id', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('DELETE FROM Recipe WHERE id = ?',[req.params.id], (err,result) => {
				if(err) throw err;
				else {
					let values = [];
					treatment(err,res,values,"success");
				}
		});
});
