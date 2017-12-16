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
	* /favorite
	* get:
	* 	description: Retourne les recette favorite associé à l'utilisateur @userID
	* 	tags:
	*				- favorite
	*		produces:
	*		- application/json
	*		responses:
	*		- description: comment
*/
router.get('/favorite/:userID', (req, res) => {
		bd.query('SELECT * from Favorite WHERE id_user = ?',[req.params.userID], (err,cols) => {
			let values = [];
			treatment(err,res,values,cols);
		})
});

/**
	*@swagger
	* /favorite
	* get:
	* 	description: Utilité à débattre
	* 	tags:
	*				- favorite
	*		produces:
	*		- application/json
	*		responses:
	*		- description: comment
*/
router.get('/favorite/:userID/:favID', (req, res) => {
	bd.query('SELECT * from Favorite WHERE id_user = ? AND id_recipe = ?',[req.params.userID, req.params.favID], (err,cols) => {
		let values = [];
		treatment(err,res,values,cols);
	})
});

/**
	*@swagger
	* /favorite
	* delete:
	* 	description: Supprime le lien entre l'utilisateur @userID et la recette @favID
	* 	tags:
	*				- favorite
	*		produces:
	*		- application/json
	*		responses:
	*		- description: recipes
*/

router.delete('/favorite/:userID/:favID', (req, res) => {
	bd.query('DELETE FROM Favorite WHERE id_user = ? AND id_recipe = ? ',[req.params.userID, req.params.favID], (err,result) => {
				if(err) throw err;
				else{
					let values = [];
					treatment(err,res,values,"success");
				}
		});
});

module.exports  = router;
