const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db');
const router = express.Router();


function checkUndefinedObject(object, fields) {
  let ok = true;
  for (const field in fields) {
    if (object[fields[field]] === undefined)
      ok = false;
  }
  return ok;
}

function sendError(res, reason) {
  res.status(400).send({
    error: true,
    reason: reason
  });
}



router.get('/user/:login', (req, res) => {
	res.contentType('application/json');
	db.query('SELECT email, description, photo FROM Project WHERE login=?', [req.params.login], (error, result) => {
		if (error) {
			sendError(res, 'Database error');
		} else {
			const  user = result[0];
			if (user) {
				res.send({
					name: user.name,
          email: user.email
					description: user.description,
					picture: user.photo
				});
			} else
				sendError(res, 'No user selected');
		}
	});
});

router.patch('/user/:login', (req, res) => {
  res.contentType('application/json');
  if(req.body.newPassword) {
  db.query("UPDATE User SET email=?, password=?, description=? WHERE login=? ", [req.body.email, createHash(req.body.newPassword), req.body.description, req.params.login], (err2, result) => {
    if (err2) throw err2;
    res.send({
      error: false
    });
  });
} else {
  db.query("UPDATE User SET email=?, description=? WHERE login=? ", [req.body.email, req.body.description, req.params.login], (err2, result) => {
    if (err2) throw err2;
    res.send({
      error: false
    });
  });
}
});


router.delete('/user/:login', (req, res) => {
  db.query('DELETE FROM User WHERE login = ?', [req.params.login], (error) => {
    if (error)
      sendError(res, 'Unable to query database');
    else {
      res.status(200).send({
        error: false
      });
    }
  });
});



var createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = router;
