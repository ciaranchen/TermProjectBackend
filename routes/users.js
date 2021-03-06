const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

const Users = UserModel.UserModel;

router.post('/register', (req, res, next) => {
  console.log(req.body.username);
  Users.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }, (err) => {
    if (err) next(err);
    else res.send({ status: "OK" });
  });
});

router.post('/login', (req, res, next) => {
  if (req.body.email &&
    req.body.password) {
    let email = req.body.email,
      password = req.body.password;

    UserModel.authenticate(email, password, (err, user) => {
      if (err || !user) return next(err);
      req.session.uid = user._id;
      res.send({
        status: "OK",
        res: user.username
      });
    });
  } else {
    next({status: 405, message: 'no enough params.'});
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session.uid) {
    // delete session
    req.session.destroy((err) => {
      if (err) return next(err);
      else res.send({"status": "OK"});
    });
  } else
    res.send({"status": "OK"});
});

router.get('/testLogin', (req, res, next) => {
  if (req.session.uid) res.send({status: "OK", res: true});
  else res.send({status: "OK", res: false});
});

router.get('/delete_user', (req, res, next) => {
  if (!req.session.uid)
    return next({status: 405, message: 'not auth.'});
  let uid = req.session.uid;
  Users.deleteOne({
    _id: uid
  }, (err) => {
    if (err) return next(err);
    res.redirect('/users/logout');
  });
});

// ================ maybe not use =====================
router.get('/profile', (req, res, next) => {
  UserModel.findById(req.session.uid)
    .exec((err, user) => {
      if (err) next(err);
      else if (!user) next({status: 405, message: 'no enough params.'});
      else return user;
    });
});

router.get('/query_name', (req, res, next) => {
  Users.findOne({email: req.query.email}, (err, doc) => {
    if (err) next(err);
    else if (doc) res.send({status: 'OK', res: true});
    else res.send({status: 'OK', res: false});
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

