let express = require('express');
let cors = require('cors');

let db = require('./db');
let login = require('./login');


let router = express.Router();
router.use(cors());

router.get('/', (req, res, next) => {
	//console.log("Entrée ici");
	res.setHeader('Content-Type', 'text/plain');
	res.send('API Works');
  //res.sendFile(path.join(__dirname,'/../index.html'));

});

router.get('/vu', (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.send('route /vu');
//res.sendFile(path.join(__dirname,'/../index.html'));

});

router.get('/swagger.json', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

db.connect(err => {
	if (err){
		throw err;
	}
	else {
		console.log('Connected to the database');

	}
});


module.exports = router;
