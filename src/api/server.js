if (process.env.NODE_ENV !== 'production')
	require('dotenv').load();

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
var swaggerDocument = require('./swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');

let app = express();
app.use(cors());
var api = require('./routes/api');
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../dist')));

//Mise en place de swaggerJSDoc
const spec = swaggerJSDoc({
	swaggerDefinition: {
		info: {
			title: 'Vide-Frigo',
			version: '1.0.0'
		},
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
	'./routes/*.js'
]
});



//inclusion du point d'entrée pour les routes
//let api = require('./routes/api');
app.use('/', api);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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

});*/

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
