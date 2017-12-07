let express = require('express');
let bd = require('./db');
let router = express.Router();




router.get('/recipes/:userID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('SELECT * FROM Recipe  ....',[req.params.userID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
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
