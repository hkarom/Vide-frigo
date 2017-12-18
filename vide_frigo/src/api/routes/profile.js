let express = require('express');
let bd = require('./db');
let router = express.Router();

router.post('/profile/:id', (req, res) => {

  const id = req.params.id;
bd.query('SELECT login, email,description,photo  FROM user WHERE  id= "' + id + '" ', function (error, user) {
  if (error) {
    console.log(error);
      } else {
    res.json(user);
  }
});
});

//update profile

router.post('/profile/:id', (req, res) => {

  const id = req.params.id;
bd.query('Update  user SET description=?,photo=? WHERE  id= "' + id + '" ', function (error, user) {
  if (error) {
    console.log(error);
      } else {
    res.json(user);
  }
});
});


module.exports = router;
