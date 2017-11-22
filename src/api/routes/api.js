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




db.connect(err => {
	if (err) throw err;
	else {
		console.log('Connected to the database');

	}
});

// exemple d'utilisation pour lister toutes les tables de la base de donnée courante
router.get('/tables', (req, res) => {
	console.log('yop');
	res.setHeader('Content-Type', 'application/json');
	db.query('SHOW TABLES', (error, tables, fields) => {

		let result = {};

		for (let i = 0; i < tables.length; i++) {
			let table = tables[i][fields[0].name];
let content = [];
			db.query(`DESCRIBE ${table}`, (err, cols, fields) => {

				for (let j = 0; j < cols.length; j++) {
					let column = {};
					for (let k = 0; k < fields.length; k++) {
						console.log(err+" err, "+cols[0]['Field']+" tab,"+fields[0].name+fields.length);
						column[fields[k].name] = cols[j][fields[k].name];
					}
					content.push(column);
				}
				//console.log(table+"----->")
				//console.log(content);

			}).on('end', () => {
				//console.log(table+"*****>")
				//console.log(result);
				res.end(JSON.stringify(result));

			});
			//console.log(content);
result[table] = content;
		}
	});
});

module.exports = router;
