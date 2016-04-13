var express = require('express');
var router = express.Router();


router.get('/:id/edit', function(req, res) {

});

router.get('/new', function(req, res) {

});

router.route('/:id')
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