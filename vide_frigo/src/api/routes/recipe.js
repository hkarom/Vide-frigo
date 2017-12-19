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
			treatment(err,res,values,cols);
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
router.post('/recipes/:id_creator', (req, res) => {
ingredient=req.body.ingredient;
  var newRecipe = {
	id_creator:req.params.id_creator,
	name:req.body.name,
	cooking_time:req.body.cooking_time,
	preparation_time:req.body.preparation_time,
	steps:req.body.steps,
	category:req.body.category
};
			bd.query('INSERT INTO recipe (id_creator, name, cooking_time, preparation_time, steps, category) VALUES (?,?,?,?,?,?)',[req.params.id_creator,req.body.name,
		req.body.cooking_time,req.body.preparation_time, req.body.steps,req.body.category], function(err, recipes) {
			//if (err) throw err;
			if(err){console.log("erreur dans insertion recipe");}
			else {
				newRecipe.id = recipes.insertId;

				res.json({
					recipe: newRecipe
				});
					bd.query('INSERT INTO recipe_ing(id_recipe, name_ing) VALUES (?,?)',[recipes.insertId,req.body.ingredient],function(err,result){
						if(err){console.log("erreur dans insertion recipe_ing");}
						else{
							console.log("recing cool!!!!!!!!!!!");
						}
					})

				console.log(newRecipe);
			 }
			});
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
	});
		//res.send(200, JSON.stringify(values));


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
		bd.query('DELETE FROM Recipe WHERE id = ?',[req.params.id], (err,result) => {
				if(err) throw err;
				else {
					let values = [];
					treatment(err,res,values,"success");
				}
		});
});

module.exports  = router;
