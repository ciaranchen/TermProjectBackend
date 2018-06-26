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
      let filename = file.fieldname + '-' + md5(file) + "." + fileFormat[fileFormat.length - 1];
      console.log(filename)
      cb(null, filename);
    }
  })
});


const Cards = cardModel.CardModel;
const Groups = cardGroupModel.cardGroupModel;

router.use((req, res, next) => {
  if (!req.session.user_id) return res.end({status: "no auth."});
  else next();
});

// router.use((req, res, next) => {
//   if (req.params.gid) {
//     Groups.findById(req.params.gid, (err, doc) => {
//       if (err) next(err);
//       if (!doc) return res.end({ status: "no privilege." });
//     })
//   }
// });

// query card.
router.get('/:gid/', (req, res) => {
  let gid = req.params.gid;
  Cards.find({ group: gid }, (err, doc) => {
    if (err) next(err);
    else res.send({status:"OK", res: doc});
  })
});

// create card
router.post('/:gid/create', upload.single('photo'), (req, res) => {
  let file = req.file;
  let gid = req.params.gid;
  if (file) {
    let filename = file.fieldname + '-' + md5(file) + "." + fileFormat[fileFormat.length - 1];
  } else {
    let filename = undefined;
  }
  Cards.create({
    group: gid,
    fileLoc: filename,
    question: req.body.question,
    answer: req.body.answer,
  }, (err) => {
    if (err) next(err);
    else res.send({status: "OK"});
  });
});

// update card
router.post('/:gid/:cid/update', (req, res) => {
  let file = req.file;
  let gid = req.params.gid;
  
  let set_set = {}
  if (req.body.answer) {
    set_set.answer = req.body.answer;
  }
  if (req.body.question) {
    set_set.question = req.body.question;
  }
  if (file) {
    let filename = file.fieldname + '-' + md5(file) + "." + fileFormat[fileFormat.length - 1];
    set_set.fileLoc = filename;
  }
  Cards.updateOne({
    group: gid,
    _id: req.params.cid,
  }, {$set: set_set}, (err) => {
    if (err) next(err);
    else res.send({status: "OK"});
  });
});

module.exports = router;
