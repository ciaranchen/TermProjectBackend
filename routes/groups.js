const express = require('express');
const router = express.Router();
const CardGroupModel = require('../models/cardGroupModel');
const CardModel = require('../models/cardModel');

const Groups = CardGroupModel.CardGroupModel;
const Cards = CardModel.CardModel;

// todo: about groups major

// router.use((req, res, next) => {
//   if (!req.session.uid) {
//     next({status: 405, message: 'not auth.'});
//   }
//   next();
// });

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
    // delete cards all in this group;
    Cards.remove({
      groups: doc._id
    }, (err) => {
      if (err) next(err);
      else res.send({
        status: 'OK',
        res: doc._id
      });   
    });
  });
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

router.get('/export', (req, res, next) => {
  // todo: add it to api doc
  let user_id = req.session.uid;
  Groups.findOne({
    _id: req.query.gid,
  }, (err, doc) => {
    if (err) return next(err);
    Cards.find({
      group: doc._id
    }, {question: 1, answer: 1}, (err, docs) => {
      if (err) return next(err);
      let filename = "exports.csv"
      res.set({
        "Content-type":"application/octet-stream",
        "Content-Disposition":"attachment;filename="+encodeURI(filename)
      });
      // generate csv file
      let f = docs.map((e) => {
        return "\"" + e.question + '\", \"' + e.answer + "\"";
      }).join('\n');
      res.write(f, "binary");
      res.end();
    });
  });
});
module.exports = router;