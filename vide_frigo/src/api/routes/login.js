const bcrypt = require('bcryptjs');
const db = require('./db');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express.Router();
const conf = require('./authentification/jwtconfig');
const passportjwt = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = passportjwt.ExtractJwt;

var params = {
  secretOrKey: conf.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = (passport) => {

  app.post('/login',
    function(req, res) {
      db.query("SELECT * FROM User WHERE login = ?", [req.body.username], function(err, rows) {
        if (err) throw err;
        if (!rows.length) {
          console.log('User Not Found with username ' + req.body.username);
          res.status(401).send({
            error: true,
            message: 'User not found'
          });
        }
        if (!bcrypt.compareSync(req.body.password, rows[0].password)) {
          console.log('Invalid Password');
          res.status(401).send({
            error: true,
            message: 'Invalid password'
          });
        }
        var user = {
          id: rows[0].id,
          username: rows[0].login,
          email: rows[0].email,
          description: rows[0].description
        };
        var payload = {
          login: req.body.username
        };
        var token = jwt.sign(payload, params.secretOrKey, {
          expiresIn: '5h'
        });
        res.json({
          token: token,
          user: user
        })
      });
    }
  );


  app.post('/register',
    function(req, res) {
      db.query("SELECT login FROM User WHERE login = ?", [req.body.username], function(err, rows) {
        if (err) {
          console.log(err);
          throw err;
        }
        if (rows.length > 0) {
          console.log('User already exists with username: ' + req.body.username);
          res.status(401).send({
            error: true,
            message: 'This login is already taken'
          });
        } else {
          var newUser = {
            username: req.body.username,
            email: req.body.email,
            description: req.body.description
          };
          db.query("INSERT INTO User (login,password,email,description) VALUES (?,?,?,?)", [req.body.username, createHash(req.body.password), req.body.email, req.body.description], function(err, result) {
            if (err) throw err;
            newUser.id = result.insertId;
            var payload = {
              login: req.body.username
            };
            var token = jwt.sign(payload, params.secretOrKey, {
              expiresIn: '5h'
            });
            res.json({
              token: token,
              user: newUser
            })
          });
        }
      });
    }
  );

  app.get('/logout', function(req, res) {
    res.send({
      response: true
    });
  });

  var createHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }


  return app;
}
