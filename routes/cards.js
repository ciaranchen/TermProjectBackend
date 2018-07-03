const md5 = require('md5');
const express = require('express');
const router = express.Router();
// const userModel = require('../models/userModel');
const cardModel = require('../models/cardModel');
const cardGroupModel = require('../models/cardGroupModel');

const multer = require('multer');

let upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      // todo: do something with fileFormat
      // todo: fix it
      // let filename = `${file.fieldname}-${md5(file)}.${fileFormat[fileFormat.length - 1]}`;
      let filename = 'test.png';
      console.log(filename);
      cb(null, filename);
    }
  })
});

const Cards = cardModel.CardModel;
const Groups = cardGroupModel.CardGroupModel;


router.use((req, res, next) => {
  if (!req.session.uid) {
    next({status: 405, message: 'not auth.'});
  }
  next();
});


router.use((req, res, next) => {
  // console.log(req.query);
  if (req.query.gid) {
    Groups.findById(req.query.gid, (err, doc) => {
      if (err) next(err);
      if (!doc) next({status: 405, message: 'no such a group.'});
      next();
    });
  } else
    next({status: 405, message: 'no enough params.'});
});

// query card.
router.get('/', (req, res) => {
  let gid = req.query.gid;
  // todo: select card
  // todo: lazy load
  Cards.find({ group: gid }, {_id: 0, __v: 0, fileLoc: 0}, (err, docs) => {
    if (err) next(err);
    else res.send({status:"OK", res: docs});
  })
});

// create card
router.post('/create', upload.single('photo'), (req, res) => {
  let file = req.file;
  let gid = req.query.gid;
  let data = {
    group: gid,
    question: req.body.question,
    answer: req.body.answer,
  };
  if (file) {
    // todo: fix it
    // let filename = `${file.fieldname}-${md5(file)}.${fileFormat[fileFormat.length - 1]}`;
    data.filename = 'test.png'
  }
  Cards.create(data, (err, doc) => {
    if (err) next(err);
    else res.send({
      status: "OK",
      res: doc._id
    });
  });
});

// update card
router.post('/:cid/update', (req, res, next) => {
  // todo: optional args
  let file = req.file;
  let gid = req.query.gid;
  let set_set = {};
  if (req.body.answer) {
    set_set.answer = req.body.answer;
  }
  if (req.body.question) {
    set_set.question = req.body.question;
  }
  if (file) {
    set_set.fileLoc = `${file.fieldname}-${md5(file)}.${fileFormat[fileFormat.length - 1]}`;
  }
  Cards.updateOne({
    group: gid,
    _id: req.params.cid,
  }, {$set: set_set}, (err) => {
    if (err) next(err);
    else res.send({status: "OK"});
  });
});

// delete card
// todo: add it to api doc
router.get('/:cid/delete', (req, res) => {
  let gid = req.query.gid;
  Cards.findOneAndRemove({
    group: gid,
    _id: req.params.cid,
  }, (err, doc) => {
    if (err) next(err);
    else res.send({status: "OK"});
  });
});

// todo: get image file

module.exports = router;
