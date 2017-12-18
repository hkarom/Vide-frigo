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


router.post('/favorites', (req, res) => {
	res.contentType('application/json');
	id=req.body.id;
		db.query('SELECT recipe.name, recipe.picture, user.login FROM favorite, user, recipe WHERE recipe.id_creator=user.id and favorite.id_user=recipe.id and favorite.id_user=?', id , (err, result) => {
			if (err) {console.log("erreur anna!!!!!")}
      else {
			let favorites = [];
			for (let i = 0; i < result.length; i++) {
				favorites.push({
					name: result[i]['name'],
          pic: result[i]['picture'],
					login: result[i]['login']
				});
			}
			res.status(200).send(favorites);
		}
  });


});



/*router.post('/postedRecipes/:id', (req, res) => {
  const id = req.params.id;
bd.query('SELECT name, picture, mark FROM recipe WHERE id_creator=? "' + id + '" ', function (error, recipesposted) {
  if (error) {
    console.log("erreur dans la requete postedRecipes");
    //console.log(error);
      } else {
    res.json(recipesposted);
  }
});
});*/

/*router.post('/favorites/:id', (req, res) => {
const id = req.params.id;
bd.query('SELECT recipe.name, recipe.picture, user.login FROM favorite, user, recipe WHERE recipe.id_creator=user.id and favorite.id_user=recipe.id and favorite.id_user=? "' + id + '" ', function (error, favorites) {
  if (error) {
    console.log("erreur dans la requete favorites");
    //console.log(error);
      } else {
    res.json(favorites);
  }
});
});*/




/*let router = express.Router();
const saltRounds = 8;

function sendError(res, reason) {
	res.status(400).send({ error: true, reason: reason });
	console.log(reason);
}


router.get('/user/:niveau', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('SELECT * FROM User WHERE niveau = ? ',[req.params.niveau], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});


router.patch('/user/:id', (req, res) => {
	let iduser = req.params.id;
	bcrypt.hash(req.body.password, saltRounds, (err, password) => {
		if (!err) {
				bd.query("UPDATE User SET name=?, password=?, mail=? WHERE id=? ",[req.body.name,password,req.body.email, iduser], (error, result) => {
						if(error) throw error;
						else{
							let values = [];
							treatment(err, res, values, "success");
						}
				});
				res.send({ error: false });
		} else
				res.send({ error: err });
	});
});*/

/*router.delete('/user/:id', (req, res) => {
	let id = req.params.id;
	bd.query("DELETE FROM User WHERE id=?",[id], (err,count) => {
		let values = [];
		treatment(err, res, values, "success");

	})
});
*/


module.exports = router;
