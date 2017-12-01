let express = require('express');
let bd = require('./db');
let router = express.Router();




router.post('/ingredients', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('SELECT * FROM Ingredients  ....',[req.body.ingredient], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});
