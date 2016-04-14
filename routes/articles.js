var express = require('express');
var router = express.Router();
var databaseHelper = require('../db/databaseHelper');

var articles = databaseHelper.model('article', {
  title: { type: 'string', id: true},
  body: { type: 'string'},
  author: { type: 'string'},
  urlTitle: { type: 'string'}
});

router.get('/:title/edit', function(req, res) {

});

router.get('/new', function(req, res) {
  res.render('new', {
    redirect: '/articles',
    inputs: ['title', 'author', 'body']
   });
});

router.route('/:title')
  .put(function(req, res) {

  })
  .delete(function(req, res) {

  });

router.route('/')
 .post(function(req, res) {
    articles.add({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    });
    res.redirect('/articles');
  })
  .get(function(req, res) {
    res.render('index', { header: 'Articles', list: articles.all() });
  });


module.exports = router;