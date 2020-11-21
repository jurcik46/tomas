var express = require('express');
var router = express.Router();
var articlesController = require("../controller/articles")
var articlesModel = require("../models/articles")

const { body, validationResult } = require('express-validator');

/* GET add article page. */
router.get('/add', function(req, res, next) {
    req.flash('info', 'Welcome');
    res.render('addArticle', {title:'Add article'});
});

router.post('/add-new', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 })
  ], async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('info', 'Formualr nieje spravne vyplenni');
        return res.render('addArticle', {title:'Add article'});
    }
    var {name,content, firstname, secondname, email } =  req.body
    var result =  await articlesModel.createArticle(name, content,firstname,secondname, email)
    if(result)
      req.flash('info', 'Uspesne sa pridal novy clanok');
    else
      req.flash('info', 'Clanok sa nepodarilo pridat');
    return res.render('addArticle', {title:'Add article'});
})

module.exports = router;
