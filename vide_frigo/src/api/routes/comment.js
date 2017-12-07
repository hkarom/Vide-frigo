let express = require('express');
let bd = require('./db');
let router = express.Router();


router.post('/comment/:userID/:recipeID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('INSERT INTO Comment ....',[req.params.userID, req.params.recipeID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});


router.patch('/comment/:userID/:recipeID/:commentID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('UPDATE Comment....',[req.params.userID, req.params.recipeID, req.params.commentID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});

router.delete('/comment/:userID/:recipeID/:commentID', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
		bd.query('DELETE ....',[req.params.userID, req.params.recipeID, req.params.commentID], (err,result) => {
				if(err) throw err;
				console.log(result);
		})
	}
		//res.send(200, JSON.stringify(values));
	}
});
