const express = require('express');
const db = require('./db');
const router = express.Router();

function checkUndefinedObject(object, fields) {
  let ok = true;
  for (const field in fields) {
    if (object[fields[field]] === undefined)
      ok = false;
  }
  return ok;
}

function sendError(res, reason) {
  res.status(400).send({
    error: true,
    reason: reason
  });
}

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
  db.query('SELECT * FROM Recipe WHERE name_creator = ?', [req.params.userID], (error, results) => {
    if (error) {
      console.log(error);
      sendError(res, 'Database error');
    } else {
      const recipes = [];
      for (let i = 0; i < results.length; i++) {
        recipes.push({
          id: results[i].id,
          name: results[i].name,
          name_creator: results[i].name_creator,
          picture: results[i].picture,
          steps: results[i].steps,
          preparation_time: results[i].preparation_time,
          category: results[i].category,
          mark: results[i].mark,
          nb_vote: results[i].nb_vote
        });
      }
      res.send(recipes);
    }
  });
});


router.get('/recipes', (req, res) => {
	let ingredients = req.query.ingredients;
	let types = req.query.types;
	let ingreq = '', typereq = '';
	for(let i = 0; i< ingredients.length; i++) {
		if(i < ingredients.length-1)
		ingreq = ingreq +  "(name_ing = '"+ingredients[i]+"') OR ";
		else ingreq = ingreq + "(name_ing = '"+ingredients[i]+"')";
	}

	/*for(let i = 0; i< types.length; i++) {
		if(i < types.length-1)
		typereq = typereq +  '(category = '+types[i]+') OR ';
		else typereq = typereq + '(category = '+types[i]+')';
	}*/

	console.log(ingreq);

	let request = "SELECT * FROM Recipe WHERE id IN (SELECT id_recipe FROM Recipe_Ing WHERE (" + ingreq + ") GROUP BY id_recipe having count(name_ing) >= " + ingredients.length + ")";
console.log(request);
  db.query(request, (error, results) => {
    if (error) {
      console.log(error);
      sendError(res, 'Database error');
    } else {
      const recipes = [];
      for (let i = 0; i < results.length; i++) {
        recipes.push({
          id: results[i].id,
          name: results[i].name,
          name_creator: results[i].name_creator,
          picture: results[i].picture,
          steps: results[i].steps,
          preparation_time: results[i].preparation_time,
          category: results[i].category,
          mark: results[i].mark,
          nb_vote: results[i].nb_vote
        });
      }
      res.send(recipes);
    }
  });
});

router.get('/recipesAll', (req, res) => {
  db.query('SELECT * FROM Recipe', (error, results) => {
    if (error) {
      console.log(error);
      sendError(res, 'Database error');
    } else {
      const recipes = [];
      for (let i = 0; i < results.length; i++) {
        recipes.push({
          id: results[i].id,
          name: results[i].name,
          name_creator: results[i].name_creator,
          picture: results[i].picture,
          steps: results[i].steps,
          preparation_time: results[i].preparation_time,
          category: results[i].category,
          mark: results[i].mark,
          nb_vote: results[i].nb_vote
        });
      }
      res.send(recipes);
    }
  });
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
  if (checkUndefinedObject(req.body, ['name', 'preparation_time', 'steps', 'category', 'mark', 'nb_vote', 'ingredients'])) {
    db.query('INSERT INTO recipe (name_creator, name, preparation_time, steps, category, mark, nb_vote) VALUES (?,?,?,?,?,?, ?)', [req.params.id_creator, req.body.name, req.body.preparation_time, req.body.steps, req.body.category, req.body.mark, req.body.nb_vote], function(err, result) {
      if (err) {
        console.log("erreur dans insertion recipe");
      } else {
        res.json({
          id: result.id
        });
        for (let i = 0; i < req.body.ingredients.length; i++) {
          db.query('INSERT INTO Recipe_Ing(id_recipe, name_ing) VALUES (?,?)', [result.id, req.body.ingredients[i]], function(err2, result2) {
            if (err2) {
              console.log("erreur dans insertion recipe_ing");
            } else {
              console.log("insert OK");
            }
          });
        }
      }
    });
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
	console.log(req.params.id);
  db.query('SELECT * FROM Recipe WHERE id = ?', [req.params.id], (error, result) => {
    if (error) {
      console.log(error);
      sendError(res, 'Database error');
    } else {
      const recipe = result[0];
      res.send({
        id: recipe.id,
        name: recipe.name,
        name_creator: recipe.name_creator,
        picture: recipe.picture,
        steps: recipe.steps,
        preparation_time: recipe.preparation_time,
        category: recipe.category,
        mark: recipe.mark,
        nb_vote: recipe.nb_vote
      });
    }
  })
});

/*router.patch('/recipe/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.query('UPDATE ... WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    console.log(result);
  })
});*/


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
  db.query('DELETE FROM Recipe WHERE id = ?', [req.params.id], (error, result) => {
    if (error)
      sendError(res, 'Unable to query database');
    else {
      res.status(200).send({
        error: false
      });
    }
  });
});

module.exports = router;
