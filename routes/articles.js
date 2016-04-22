var express = require('express');
var router = express.Router();

var validateBody = require('../lib/middleware/validateBody');
var checkHeaders = require('../lib/middleware/checkArticleHeaders');

// router.use(checkHeaders);

router.get('/:title/edit', function(req, res) {
  req.articles.getArticle(req.params.title)
    .then(function (article) {
      res.render('edit', {
        title: article[0].title,
        editItem: article[0],
        redirect: '/articles/'+req.params.title
      });
    });
});

router.get('/new', function(req, res) {
  res.render('new', {
    title: "Articles",
    redirect: '/articles',
    inputs: ['title', 'author', 'body']
   });
});

router.route('/:title')
  .put(validateBody({'title': 'string', 'author': 'string', 'body': 'string'}), function(req, res) {
    req.articles.editArticle(req.params.title, req.body)
    .then(function () {
      res.json({ success: true, redirect : '/articles'});
    })
    .catch(function (err) {
      res.json({ success: false, errors: {}});
    });
  })
  .delete(function(req, res) {
    req.articles.deleteArticle(req.params.title)
    .then(function () {
      res.json({success: true});
    })
    .catch(function (err) {
      res.status(500).render('error/500');
    });
  });


router.route('/')
  .post(validateBody({'title' : 'string', 'author': 'string', 'body' : 'string'}), function(req, res) {
    req.articles.addArticle(req.body)
    .then(function () {
      res.json({ success: true, redirect : '/articles'});
    })
    .catch(function (err) {
      console.log(err);
      res.json({ success: false, errors: {}});
    });
  })
  .get(function(req, res) {
    req.articles.getAll()
    .then(function (articles) {
      res.render('articleIndex', { title: 'Articles', list: articles});
    })
    .catch(function(err) {
      res.render('error/500');
    });
});


module.exports = router;