var express = require('express');
var router = express.Router();

var validateBody = require('../lib/middleware/validateBody');

router.get('/:id/edit', function(req, res) {
  req.products.getProduct(req.params.id)
  .then(function(product) {
    res.render('edit', {
      title: product.name,
      editItem: product[0],
      redirect: '/products/'+req.params.id
    });
  });
});

router.get('/new', function(req, res) {
  res.render('new', {
    title: "Products",
    redirect: '/products',
    inputs: [ 'name', 'price', 'inventory']
  });
});

router.route('/:id')
  .put(validateBody({'name' : 'string', 'price': 'string',
   'inventory': 'number'}), function(req, res) {
    req.products.editProduct(req.params.id, req.body)
    .then(function() {
      console.log('success');
      res.json({ success: true, redirect : '/products'});
    })
    .catch(function(error) {
      res.json({ success: false, errors: {}});
    });
  })
  .delete(function(req, res) {
    req.products.deleteProduct(req.params.id)
    .then(function() {
      res.json({success : true});
    })
    .catch(function(err) {
      res.json({success : false});
    });
  });

router.route('/')
  .post(validateBody({'name' : 'string', 'price': 'string',
    'inventory': 'number'}),function(req, res) {
    req.products.addProduct(req.body)
    .then(function() {
      res.json({ success: true, redirect : '/products'});
    })
    .catch(function(err) {
      res.json({ success: false, errors: {}});
    });
  })
  .get(function(req, res) {
    req.products.getAll()
    .then(function(products) {
        res.render('productIndex', { title: 'Products', list: products});
    })
    .catch(function(err) {
        res.render('error/500');
    });
  });


module.exports = router;