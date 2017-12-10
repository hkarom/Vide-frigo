let express = require('express');
let cors = require('cors');

let db = require('./db');
let login = require('./login');
let ingredient = require('./ingredient');

let router = express.Router();
router.use(cors());

router.get('/', (req, res, next) => {
	//console.log("Entrée ici");
	res.setHeader('Content-Type', 'text/plain');
	res.send('API Works');
  //res.sendFile(path.join(__dirname,'/../index.html'));

});



db.connect(err => {
	if (err) throw err;
	else {
		console.log('Connected to the database');
		router.use(ingredient);
	}
});


module.exports = router;
