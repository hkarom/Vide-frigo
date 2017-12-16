const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const db = require('../db');
const passportjwt = require("passport-jwt");
const ExtractJwt = passportjwt.ExtractJwt;
const conf = require('./jwtconfig');

var params = {
  secretOrKey: conf.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


module.exports = function() {

  const strategy = new JwtStrategy(params, function(payload, done) {
    db.query("SELECT * FROM User WHERE login = ?", [payload.login], function(err, rows) {
      if (err) return done(err);
      if (!rows.length) {
        console.log('User Not Found with username ' + payload.login);
        return done(null, false);
      }

      return done(null, {
        login: payload.login
      });
      });

  });
  return strategy;

}
