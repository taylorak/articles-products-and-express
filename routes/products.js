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
  var product = products.getById(req.params.id);
  var productCopy = {
    name: product.name,
    price: product.price,
    inventory: product.inventory
  };

  res.render('edit', {
    editItem: productCopy,
    path: '/products/'+req.params.id
  });
});

router.get('/new', function(req, res) {
  res.render('new', {
    redirect: '/products',
    inputs: [ 'name', 'price', 'inventory']
  });
});

router.route('/:id')
  .put(function(req, res) {
    products.editById(req.params.id, req.body);
    res.redirect('/products');
  })
  .delete(function(req, res) {
    products.deleteById(req.params.id);
    res.json({success : true});
  });

router.route('/')
  .post(function(req, res) {
    console.log('poopie', req.body.name);
    products.add({
      id: products.all().length,
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory,
    });
    res.redirect('/products');
  })
  .get(function(req, res) {
    res.render('index', { header: 'Products', list: products.all()});
  });


module.exports = router;