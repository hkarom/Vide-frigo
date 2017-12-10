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
    treatment(err,res,values,cols);
	});
});

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


router.patch('/comment/:userID/:recipeID/:commentID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('UPDATE avis SET message = ? etoile = ?
							WHERE id_user = ? AND id_recette = ? AND id_avis = ?',
							[req.body.message, req.body.etoile, req.params.userID, req.params.recipeID, req.params.commentID], (err,result) => {
								let values = [];
					      treatment(err,res,values,"success");
		});
});

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
