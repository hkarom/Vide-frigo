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

router.get('/recipes/:userID', (req, res) => {
		bd.query('SELECT * FROM Recipe  ....',[req.params.userID], (err,cols) => {
			let values = [];
			treatment(err,res,values,cols)
		})
});

router.post('/recipes/:userID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('INSERT INTO Recipe  ....',[req.params.userID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});


router.get('/recipe/:id', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('SELECT * FROM Recipe WHERE id = ?',[req.params.id], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
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

router.delete('/recipe/:id', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('DELETE FROM Recipe WHERE id = ?',[req.params.id], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});
