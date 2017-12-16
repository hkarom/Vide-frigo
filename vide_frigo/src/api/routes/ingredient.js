let express = require('express');
let db = require('./db');
let router = express.Router();


function checkUndefinedObject(object, fields) {
	let ok = true;
	for (let field in fields) {
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
	console.log(reason);
}


router.post('/ingredients', (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['search'])) {
		db.query("SELECT name FROM Ingredient WHERE name LIKE ? ", '%' + req.body.search + '%', (err, result) => {
			if (err) throw err;
			else {
				let ingredients = [];
				for (let i = 0; i < result.length; i++) {
					ingredients.push({
						search: result[i]['name']
					});
				}
				res.status(200).send(ingredients);
			}
		})
	} else
		sendError(res, 'Error: required parameters not set');

});


router.get('/ingredients', (req, res) => {
	res.contentType('application/json');
		db.query("SELECT name FROM Ingredient", (err, result) => {
			if (err) throw err;
			else {
				let ingredients = [];
				for (let i = 0; i < result.length; i++) {
					ingredients.push({
						search: result[i]['name']
					});
				}
				res.status(200).send(ingredients);
			}
		})


});


module.exports = router;
