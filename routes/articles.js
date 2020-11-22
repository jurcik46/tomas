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
  req.flash('info', 'Clanok bol uspesne vymazany');
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
    req.flash('info', 'Clanok bol aktualizovany');
  else
    req.flash('info', 'Clanok sa nepodarilo aktualizovat');
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
