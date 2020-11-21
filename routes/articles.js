var express = require('express');
var router = express.Router();
var articlesController = require("../controller/articles")

const { body, validationResult } = require('express-validator');

/* GET add article page. */
router.get('/add', function(req, res, next) {
    req.flash('info', 'Welcome');
    res.render('addArticle', {title:'Add article'});
});

router.post('/add-new', [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('name').isLength({ min: 5 })
  ],function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('info', 'dojebal si to');
    //   return res.status(400).json({ errors: errors.array() });
        return res.render('addArticle', {title:'Add article'});
    }
    req.flash('info', 'Uspesne sa pridal novy clanok');
  return res.render('addArticle', {title:'Add article'});
})

module.exports = router;
