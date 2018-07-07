const express = require('express');
const router = express.Router();

const CardModel = require('models/cardModel');
const Cards = CardModel.CardModel;

// todo: randomn recommend
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
