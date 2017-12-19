const express = require('express');
const db = require('./db');
const ingredient = require('./ingredient');
const recipes = require('./recipe');
const favorite = require('./favorite');
const comment = require('./comment');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const sizeOf = require('image-size');


router.use(ingredient);
router.use(recipes);
router.use(comment);
router.use(favorite);


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
    let dimensions = sizeOf(file.path);
    if (dimensions.width > 500 || dimensions.height > 500) {
      fs.unlink(file.path);
      filename = null;
    } else {
      fs.rename(file.path, filefullname, (err) => {
        db.query("UPDATE User SET photo = ? WHERE login = ?", ['../assets/profiles/'+filename, req.headers.username], function(err, result) {
          if (err) throw err;
        });
      });
    }
  });

  form.on('end', function() {
    res.json({
      picture: filefullname
    });
  });

  form.on('error', function() {
    console.log('ERROR');
  });

});


router.post('/uploadrecipe', function(req, res) {
  res.contentType('application/json');
  var form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = path.join(__dirname, '../../assets/recipes');
  var filename, extension, filefullname;
  form.parse(req);

  form.on('fileBegin', function(name, file) {
    extension = file.name.split('.');
    filename = file.path.split('/');
    filename = filename[filename.length - 1] + '.' + extension[extension.length - 1];
    filefullname = file.path + '.' + extension[extension.length - 1];
  });

  form.on('file', function(name, file) {
    let dimensions = sizeOf(file.path);
    if (dimensions.width > 700 || dimensions.height > 700) {
      fs.unlink(file.path);
      filename = null;
    } else {
      fs.rename(file.path, filefullname, (err) => {
        db.query("UPDATE Recipe SET picture = ? WHERE id = ?", [filefullname, req.headers.id_recipe], function(err, result) {
          if (err) throw err;
        });
      });
    }
  });

  form.on('end', function() {
    res.json({
      picture: filefullname
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
