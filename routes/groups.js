const express = require('express');
const router = express.Router();
const CardGroupModel = require('../models/cardGroupModel');

const Groups = CardGroupModel.CardGroupModel;

// todo: about groups major

router.use((req, res, next) => {
  if (!req.session.uid) {
    next({status: 405, message: 'not auth.'});
  }
});

router.get('/create', (req, res, next) => {
  let name = req.params.name;
  let user_id = req.session.uid;
  Groups.create({
    name: name,
    creator: user_id,
    owner: user_id,
  }, (err) => {
    if (err) next(err);
    else res.send({status: 'OK'});
  });
});

router.get('/getall', (req, res, next) => {
  let user_id = req.session.uid;
  Groups.where("owner").equal(user_id)
    .exec((err, docs) => {
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
    id: group_id,
    owner: user_id
  }, (err, doc) => {
    // console.log(doc);
    if (err) next(err);
    else if (!doc) next({status: 405, message: 'no such a group.'});
    else res.send({
      status: 'OK'
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

module.exports = router;