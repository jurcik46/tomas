var express = require('express');
var router = express.Router();
var articlesController = require("../controller/articles")
var articlesModel = require("../models/articles")

const { body, validationResult } = require('express-validator');

router.get('/', async function(req, res, next) {
  res.render('articles', {title:'Aarticles', articles: await articlesModel.getAllArticle()});
});

/* GET add article page. */
router.get('/add/new', function(req, res, next) {
    res.render('addArticle', {title:'Add article'});
});

router.get('/:articleId', async function(req, res, next) {
  const {articleId} = req.params;
  res.render('article', {title:'Article', article: await articlesModel.getArticle(articleId)});
});

router.get('/delete/:articleId', async function(req, res, next) {
  const {articleId} = req.params;
  req.flash('info', 'Článok bol úspešne vymazaný!');
  await articlesModel.deleteArticle(articleId);
  res.redirect('/articles');
});

router.get('/update/:articleId', async function(req, res, next) {
  const {articleId} = req.params;
  res.render('updateArticle', {title:'Update Article', article: await articlesModel.getArticle(articleId)});
});

router.post('/update/:articleId', [
      body('email').isEmail().normalizeEmail(),
      body('name').isLength({ min: 5 }).escape(),
      body('content').isLength({ min: 10 }).escape(),
      body('firstname').isLength({ min: 3 }).escape(),
      body('secondname').isLength({ min: 3 }).escape()
    ], async function(req, res, next) {
  const {articleId} = req.params;
  var {name,content, firstname, secondname, email, authorid, articleid } =  req.body
  var result =  await articlesModel.updateArticle(name, content,firstname,secondname, email,authorid, articleid )
  if(result)
    req.flash('info', 'Článok bol aktualizovaný!');
  else
    req.flash('info', 'Článok sa nepodarilo aktualizovať!');
  return res.render('updateArticle', {title:'Add article', article: await articlesModel.getArticle(articleId)});
});

router.post('/add', [
    body('email').isEmail().normalizeEmail(),
    body('name').isLength({ min: 5 }).escape(),
    body('content').isLength({ min: 10 }).escape(),
    body('firstname').isLength({ min: 3 }).escape(),
    body('secondname').isLength({ min: 3 }).escape()
  ], async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('info', 'Formulár nie je správne vyplnený!');
        return res.render('addArticle', {title:'Add article'});
    }
    var {name,content, firstname, secondname, email } =  req.body
    var result =  await articlesModel.createArticle(name, content,firstname,secondname, email)
    if(result)
      req.flash('info', 'Úspešne sa podarilo pridať nový článok!');
    else
      req.flash('info', 'Článok sa nepodarilo pridať!');
    return res.render('addArticle', {title:'Add article'});
})

module.exports = router;
