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

router.get('/favorites/:userID', (req, res) => {
	res.contentType('application/json');
	db.query('SELECT * FROM Favorite f INNER JOIN Recipe r ON f.id_recipe = r.id WHERE id_user = ?', [req.params.userID], (error, results) => {
		if (error) {
			console.log(error);
			sendError(res, 'Database error');
		}
		else {
			const recipes = [];
			for (let i = 0; i < results.length; i++) {
				projects.push({
					id: results[i].id, name: results[i].name,
					name_creator: results[i].name_creator,
					picture: results[i].picture,
					steps: results[i].steps, preparation_time: results[i].preparation_time,
					category: results[i].category, mark: results[i].mark,
					nb_vote: results[i].nb_vote
				});
			}
			res.send(recipes);
		}
	});
});




router.post('/favorites/:userID/:idrecipe', (req, res) => {
  res.contentType('application/json');
    db.query("INSERT INTO Favorite (id_user, id_recipe) VALUES(?,?)", [req.body.userID, req.params.idrecipe], (error) => {
      if (error)
        sendError(res, 'Unable to query database');
      else {
        res.status(200).send({
          error: false
        });
      }
    });
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

router.delete('/favorite/:idrecipe/:login', (req, res) => {
  db.query('DELETE FROM Favorite WHERE id_user = ? AND id_recipe = ?', [req.params.login, req.params.idrecipe], (error) => {
    if (error)
      sendError(res, 'Unable to query database');
    else {
      res.status(200).send({
        error: false
      });
    }
  });
});

module.exports  = router;
