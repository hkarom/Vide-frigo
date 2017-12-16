/*if (process.env.NODE_ENV !== 'production')
	require('dotenv').load();
var swaggerJSDoc = require('swagger-jsdoc');
var express = require('express');
var path = require('path');
let db = require('./routes/db');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let http = require('http');
var cors = require('cors');
var swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./swagger.json');
let api = require('./routes/api')
//let aps = require('./app.js');

//Mise en place de swaggerJSDoc
let spec = swaggerJSDoc({
	swaggerDefinition: {
		info: {
			title: 'Vide-Frigo',
			description:
									'Site permettant la recherche de recettes par ingrédients \n'+
									'Réalisé dans le cadre de l\'UE Programmation Web',
			version: '1.0.0'
		},
		basePath: '/api/v1',
		schemes: ['http'],
		produces: ['application/json'],
		consumes: ['application/json'],

		securityDefinitions: {
			jwt: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
		}
	},
	security: [
		{ jwt: []}
	]
},
apis: [
	'./routes/recipe.js'
]
});

//var swaggerSpec = swaggerJSDoc(spec);


let app = express();
app.use(cors());
//var api = require('./routes/api');
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../dist')));




//inclusion du point d'entrée pour les routes
//let api = require('./routes');
app.use('/api', require('./routes/api.js'));
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

let router = express.Router();

router.get('/swagger.json', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerJSDoc(spec));
});

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});*/
/*app.use(function(req, res, next){

    res.setHeader('Content-Type', 'text/plain');
console.log(__dirname+"/../index.html");
    res.send(404, 'Page introuvable !');

});

let port = process.env.NODE_PORT;
let server = http.createServer(app);


server.listen(port, () =>
console.log(`Running on localhost:${port}`));
/*if (app.get('env') === 'development')
{
app.listen(process.env.NODE_PORT, function () {
console.log('Example app listening on port '+process.env.NODE_PORT+'!');
});
}
else{
app.listen(8080, function () {
console.log('Example app listening on port 8080!');
});
}
module.exports = app;*/

if (process.env.NODE_ENV !== 'production')
  require('dotenv').load();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const app = express();

const passport = require('passport');
const db = require('./routes/db');
const strategy = require('./routes/authentification/auth')();

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

passport.use(strategy);
app.use(passport.initialize());

const login = require('./routes/login.js')(passport);

app.use('/auth',login);
app.use(express.static(path.join(__dirname, '../../dist')));
app.use('/api',require('./routes/api'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const port = process.env.NODE_PORT;
app.listen(port, () => console.log(`:listening to port ${port}`));
