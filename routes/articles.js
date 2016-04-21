var express = require('express');
var router = express.Router();

var validateBody = require('../lib/middleware/validateBody');
var checkHeaders = require('../lib/middleware/checkArticleHeaders');

// router.use(checkHeaders);

router.get('/:title/edit', function(req, res) {
  req.conn.query('SELECT title, author, body FROM articles WHERE title = $1', req.params.title)
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
    if('title' in req.body){
      req.body.urltitle = encodeURIComponent(req.body.title);
    }
    req.conn.query('UPDATE articles SET title = $1, author = $2, body = $3, urltitle = $4 WHERE title = $5', [req.body.title, req.body.author, req.body.body, req.body.urltitle, req.params.title])
    .then(function () {
      res.json({ success: true, redirect : '/articles'})
    })
    .catch(function (err) {
      res.json({ success: false, errors: {}});
    });
  })
  .delete(function(req, res) {
    req.conn.query('DELETE FROM articles WHERE title = $1', req.params.title)
    .then(function () {
      res.json({success: true});
    })
    .catch(function (err) {
      res.status(500).render('error/500');
    });
  });


router.route('/')
  .post(validateBody({'title' : 'string', 'author': 'string', 'body' : 'string'}), function(req, res) {
    req.conn.query('INSERT INTO articles (title, author, body, urltitle)' +
      'VALUES ($1, $2, $3, $4)', [req.body.title, req.body.author, req.body.body, encodeURIComponent(req.body.title)])
    .then(function () {
      res.json({ success: true, redirect : '/articles'});
    })
    .catch(function (err) {
      res.json({ success: false, errors: {}});
    });
  })
  .get(function(req, res) {
    req.conn.query('SELECT * FROM articles')
    .then(function (articles) {
      res.render('articleIndex', { title: 'Articles', list: articles});
    });
});


module.exports = router;