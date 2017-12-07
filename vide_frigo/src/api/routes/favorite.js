let express = require('express');
let bd = require('./db');
let router = express.Router();



router.get('/favorite/:userID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('SELECT * from Favorite  ....',[req.params.userID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});


router.get('/favorite/:userID/:favID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('SELECT * FROM Favorite....',[req.params.userID, req.params.favID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});

router.delete('/favorite/:userID/:favID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('DELETE ....',[req.params.userID, req.params.favID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});
