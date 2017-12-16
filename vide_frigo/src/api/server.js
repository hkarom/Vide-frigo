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


var port = process.env.NODE_PORT;
app.listen(port, () => console.log(`:listening to port ${port}`));
