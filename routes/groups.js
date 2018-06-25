const express = require('express');
const router = express.Router();
const CardGroupModel = require('../models/cardGroupModel');

const Groups = CardGroupModel.CardGroupModel;

router.get('/create', (req, res, next) => {
  let name = req.params.name;
  let user_id = req.session.id;
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
  let user_id = req.session.id;
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
  let user_id = req.session.id;
  // todo: get group_id from request
  let group_id = group_id;
  Groups.findOneAndRemove({
    id: group_id,
    owner: user_id
  }, (err, doc) => {
    console.log(doc);
    if (err) next(err);
    else res.send({
      status: 'OK'
    });
  });
});

// change name of group
router.get('/update', (req, res, next) => {
  let user_id = req.session.id;
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