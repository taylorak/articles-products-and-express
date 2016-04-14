var express = require('express');
var router = express.Router();

var databaseHelper = require('../db/databaseHelper');
var products = databaseHelper.model('product', {
  id: { type: "number", id: true },
  name: { type: "string" },
  price: { type: 'string' },
  inventory:  { type: "number" }
});

router.get('/:id/edit', function(req, res) {

});

router.get('/new', function(req, res) {

});

router.route('/:id')
  .put(function(req, res) {
    console.log(products.getById(req.params.id));
  })
  .delete(function(req, res) {

  });

router.route('/')
  .post(function(req, res) {
    products.add({
      id: products.all().length,
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory,
    });
    res.json({success : true});
  })
  .get(function(req, res) {
    console.log(products.all());
    res.json({success : true});

  });


module.exports = router;