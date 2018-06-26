const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

const Users = UserModel.UserModel;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({status: 'OK'});
});

// maybe not use
router.get('/query_name', (req, res, next) => {
  Users.findOne({email: req.query.email}, (err, doc) => {
    if (err) next(err);
    else if (doc) res.send({status:'OK', res: true});
    else res.send({status:'OK', res: false});
  });
});

router.post('/register', (req, res, next) => {
  console.log(req.body.username);
  Users.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }, (err) => {
    if (err) next(err);
    else {
      console.log(req.body);
      // todo: send auth email to user.
      res.send({
        status: "OK"
      });
    }
  });
});

router.get('/auth/:uid', (req, res, next) => {
  console.log(req.params.uid);
  // todo: update user state
});

router.post('/login', (req, res, next) => {
  if (req.body.email &&
    req.body.username &&
    req.body.password) {
    let email = req.body.email,
      password = req.body.password;

    UserModel.authenticate(email, password, (err, user) => {
      if (err || !user) return next(err);
      else {
        req.session.user_id = user._id;
        res.send({
          status: "OK",
          res: user.username
        });
      }
    });
  } else {
    return next(new Error('All fields required.'));
  }
});

// logout
router.get('/logout', (req, res, next) => {
  if (req.session.id) {
    // delete session
    req.session.destroy((err) => {
      if (err) return next(err);
      else res.send({"status": "OK"});
    });
  } else
    res.send({"status": "OK"});
});

// maybe not use
router.get('/profile', (req, res, next) => {
  UserModel.findById(req.session.user_id)
    .exec((err, user) => {
      if (err) return next(res);
      else if (!user) return next(new Error("not authorized."));
      else return user;
    });
});

/*
router.get('/upload_avatar', upload.single('avatar'), (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) return err;
    else return {status: "OK"};
  });
});
*/

module.exports = router;

