var express = require('express');
var router = express.Router();


router.get('/:title/edit', function(req, res) {

});

router.get('/new', function(req, res) {

});

router.route('/:title')
  .put(function(req, res) {

  })
  .delete(function(req, res) {

  });

router.route('/')
  .post(function(req, res) {

  })
  .get(function(req, res) {

  });

module.exports = router;