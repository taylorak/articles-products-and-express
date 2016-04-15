var express = require('express');
var router = express.Router();

var validateBody = require('../lib/middleware/validateBody');
var checkHeaders = require('../lib/middleware/checkArticleHeaders');

var databaseHelper = require('../lib/databaseHelper');
var articles = databaseHelper.model('article', {
  title: { type: 'string', id: true},
  body: { type: 'string'},
  author: { type: 'string'},
  urlTitle: { type: 'string'}
});

// router.use(checkHeaders);

router.get('/:title/edit', function(req, res) {
  articles.getById(req.params.title, function(err, article) {
    var articlesCopy = {
      title: article.title,
      body: article.body,
      author: article.author
    };

    res.render('edit', {
      editItem: articlesCopy,
      path: '/articles/'+req.params.title
    });
  });
});

router.get('/new', function(req, res) {
  res.render('new', {
    redirect: '/articles',
    inputs: ['title', 'author', 'body']
   });
});

router.route('/:title')
  .put(validateBody({'title': 'string', 'author': 'string', 'body': 'string'}), function(req, res) {
    if('title' in req.body){
      req.body.urlTitle = encodeURIComponent(req.body.title);
    }
    articles.editById(req.params.title, req.body, function(err, element) {
      if(err) {
        res.status(500).render('error/500');
      } else {
        res.redirect('/articles');
      }
    });
  })
  .delete(function(req, res) {
    articles.deleteById(req.params.title, function(err) {
      if(err) {
        res.status(500).render('error/500');
      } else {
        res.json({success: true});
      }
    });
  });

router.route('/')
 .post(validateBody({'title' : 'string', 'author': 'string', 'body' : 'string'}), function(req, res) {
    articles.add({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
      urlTitle: encodeURIComponent(req.body.title)
    }, function(err) {
      if(err) {
        res.status(500).render('error/500');
      } else {
        res.redirect('/articles');
      }
    });
  })
  .get(function(req, res) {

    articles.all(function(err, elements) {
      var articleCopies = elements.reduce(function (previous, current) {
        var articleCopy= {};
        articleCopy.title= current.title;
        articleCopy.author = current.author;
        articleCopy.body = current.body;
        previous.push(articleCopy);
        return previous;
      }, []);

      res.render('index', { header: 'Articles', list: articleCopies});
    });


  });


module.exports = router;