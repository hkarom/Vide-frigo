let express = require('express');
let bd = require('./db');

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
