const express = require('express');
const router = express.Router();

const CardGroupModel = require('../models/cardGroupModel');
const Groups = CardGroupModel.CardGroupModel;

router.get('/', function(req, res, next) {
  res.redirect('/common/randomn');
});

router.get('/randomn', (req, res) => {
  Groups.aggregate(
    [{$match: {major: req.query.major}},
      {$sample: {size: req.query.num}}],
    {name: 1, owner: 1, _id: 1, major: 1},
    (err, docs) => {
      if (err) return next(err);
      // console.log(docs);
      res.send({
        status: "OK",
        res: docs
      });
    });
});

module.exports = router;
