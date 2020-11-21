var express = require('express');
var router = express.Router();
var homepageController = require("../controller/homepage")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', homepageController.res());
});

module.exports = router;
