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

router.get('/comments/:recipeID', (req, res) => {
  db.query('SELECT * FROM Comment WHERE id_recipe = ?', [req.params.recipeID], (error, results) => {
		if (error) {
			console.log(error);
			sendError(res, 'Database error');
		}
		else {
			const comments = [];
			for (let i = 0; i < results.length; i++) {
				projects.push({
					id: results[i].id,
					id_recipe: results[i].id_recipe,
					id_user: results[i].id_user,
					message: results[i].message,
					star: results[i].star
				});
			}
			res.send(comments);
		}
  });
});



router.get('/comments/user/:userID', (req, res) => {
  db.query('SELECT * FROM Comment WHERE id_user = ?', [req.params.userID], (error, results) => {
		if (error) {
			console.log(error);
			sendError(res, 'Database error');
		}
		else {
			const comments = [];
			for (let i = 0; i < results.length; i++) {
				projects.push({
					id: results[i].id,
					id_recipe: results[i].id_recipe,
					id_user: results[i].id_user,
					message: results[i].message,
					star: results[i].star
				});
			}
			res.send(comments);
		}
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

router.post('/comments/:recipeID', (req, res) => {
  let values = [];
  if (typeof req.body.message !== 'undefined' && typeof req.body.star !== 'undefined') {
    db.query('INSERT INTO Comment VALUES (?,?,?,?)', [req.body.id_user, req.params.recipeID, req.body.message, req.body.mark], (error, result) => {
			if (error) {
				console.log(error);
			}
			else
			res.send({error:false});
    });
  } else {
    values.push({
      'result': 'error',
      'msg': 'Missing field'
    });
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
router.delete('/comment/:userID/:recipeID/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.query('DELETE FROM Comment WHERE id_user = ? AND id_recette = ? AND id = ?', [req.params.userID, req.params.recipeID, req.params.id], (err, result) => {
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
