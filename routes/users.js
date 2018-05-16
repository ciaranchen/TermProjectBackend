const express = require('express');
const router = express.Router();
const multer = require('multer');
let upload = multer({dest: 'uploads/'});
const UserModel = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({status: 'OK'});
});

router.post('/register', upload.single('avatar'), (req, res, next) => {
  // let username = req.body.username,
  //   password = req.body.password;
  // todo: register this person
  console.log(req.body);
  // userModel.create()
});

router.post('/login', (req, res, next) => {
  if (req.body.email &&
    req.body.username &&
    req.body.password) {
    let userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    UserModel.authenticate(email, password, (err, user) => {
      if (err || !user) return next(err);
      else {
        req.session.user_id = user._id;
        return {
          "status": "OK"
        };
      }
    });
  } else {
    return next(new Error('All fields required.'));
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session
    req.session.destroy((err) => {
      if (err) return next(err);
      else return {"status": "OK"}
    });
  }
  return {"status": "OK"}
});

router.get('/profile', (req, res, next) => {
  UserModel.findById(req.session.user_id)
    .exec((err, user) => {
      if (err) return next(res);
      else if (!user) return next(new Error("not authorized."));
      else return user;
    });
});

router.get('/update_profile', (req, res, next) => {
  // todo: finish this.
});

module.exports = router;
