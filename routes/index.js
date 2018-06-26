const express = require('express');
const router = express.Router();

// todo: randomn recommend
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
