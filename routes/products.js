var express = require('express');
var router = express.Router();

var validateBody = require('../lib/middleware/validateBody');
var databaseHelper = require('../lib/databaseHelper');
var products = databaseHelper.model('product', {
  id: { type: "number", id: true },
  name: { type: "string" },
  price: { type: 'string' },
  inventory:  { type: "number" }
});

router.get('/:id/edit', function(req, res) {
  products.getById(req.params.id, function(err, product) {
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

});

router.get('/new', function(req, res) {
  res.render('new', {
    redirect: '/products',
    inputs: [ 'name', 'price', 'inventory']
  });
});

router.route('/:id')
  .put(validateBody({'name' : 'string', 'price': 'number', 'inventory': 'number'}), function(req, res) {
    products.editById(req.params.id, req.body, function(err) {
      if(err) {
        res.status(500).render('error/500');
      } else {
        res.redirect('/products');
      }
    });
  })
  .delete(function(req, res) {
    products.deleteById(req.params.id, function(err) {
      if(err) {
        res.json({success : false});
      } else {
        res.json({success : true});
      }
    });
  });

router.route('/')
  .post(validateBody({'name' : 'string', 'price': 'number', 'inventory': 'number'}),function(req, res) {
    products.add({
      id: products.length(),
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory,
    }, function(err) {
      if(err) {
        res.status(500).render('error/500');
      } else {
        res.redirect('/products');
      }
    });
  })
  .get(function(req, res) {
    products.all(function(err, elements) {
      res.render('productIndex', { title: 'Products', list: elements});
    });
  });


module.exports = router;