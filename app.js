var express = require('express');
var bodyParser = require('body-parser');
var pug = require('pug');
var app = express();

var productRoute = require('./routes/products');
var articlesRoute = require('./routes/articles');

app.set('view engine', pug);
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', function(req, res) {
  res.json({success : true});
});

app.use('/products', productRoute);
app.use('/articles', articlesRoute);

if(!module.parent) {
  app.listen(3000);
}

module.exports = app;