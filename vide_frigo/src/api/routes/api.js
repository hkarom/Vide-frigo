const express = require('express');
const db = require('./db');
const ingredient = require('./ingredient');
const user = require('./user');
const recipes = require('./recipe');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const sizeOf = require('image-size');


router.use(ingredient);
router.use(user);
router.use(recipes);


router.post('/upload', function(req, res) {
  res.contentType('application/json');
  var form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = path.join(__dirname, '../../assets/profiles');
  var filename, extension, filefullname;
  form.parse(req);
    form.on('fileBegin', function(name, file) {
    extension = file.name.split('.');
    filename = file.path.split('/');
    filename = filename[filename.length - 1] + '.' + extension[extension.length - 1];
    filefullname = file.path + '.' + extension[extension.length - 1];
  });

  form.on('file', function(name, file) {
      console.log("iiiiii"+filename);
    let dimensions = sizeOf(file.path);
    if (dimensions.width > 300 || dimensions.height > 300) {
      fs.unlink(file.path);
      filename = null;
    } else {
      fs.rename(file.path, filefullname, (err) => {
      db.query("UPDATE user SET photo = ? WHERE login = ?", [filename, req.headers.username], function(err, result) {
          if (err) throw err;
        });
      });
    }
  });

  form.on('end', function() {
    res.json({
      picture: filename
    });
  });

  form.on('error', function() {
    console.log('ERROR');
  });

});

router.get('/swagger.json', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});


module.exports = router;
