const express = require('express');
const router = express.Router();
const CardGroupModel = require('../models/cardGroupModel');

const Groups = CardGroupModel.CardGroupModel;

// todo: about groups major

router.use((req, res, next) => {
  if (!req.session.uid) {
    next({status: 405, message: 'not auth.'});
  }
  next();
});

router.get('/create', (req, res, next) => {
  let name = req.query.name;
  let user_id = req.session.uid;
  Groups.create({
    name: name,
    creator: user_id,
    owner: user_id,
  }, (err, doc) => {
    if (err) next(err);
    else res.send({status: 'OK', res: doc._id});
  });
});

router.get('/getall', (req, res, next) => {
  let user_id = req.session.uid;
  // todo: explain in api doc
  Groups.find({owner: user_id}, {name: 1, owner: 1, _id: 1},
    (err, docs) => {
      if (err) next(err);
      else res.send({
        status: 'OK',
        res: docs
      });
    });
});

router.get('/delete', (req, res, next) => {
  let user_id = req.session.uid;
  // get group_id from request
  let group_id = req.query.gid;
  Groups.findOneAndRemove({
    _id: group_id,
    owner: user_id
  }, (err, doc) => {
    // console.log(doc);
    if (err) next(err);
    else if (!doc) next({status: 405, message: 'no such a group.'});
    else res.send({
        status: 'OK',
        res: doc._id
    });
  });
  // todo: delete all card in this group.
});

// change name of group
router.get('/update', (req, res, next) => {
  let user_id = req.session.uid;
  if (!req.query.name) next({status: 405, message: 'no enough params.'});
  Groups.updateOne({
    owner: user_id,
    _id: req.query.gid
  }, {
    name: req.query.name
  }, (err) => {
    if (err) next(err);
    else res.send({
      status: 'OK'
    });
  })
});

// todo: import groups
// todo: export groups

module.exports = router;