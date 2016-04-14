var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var app = express();

var productRoute = require('./routes/products');
var articlesRoute = require('./routes/articles');

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended : true }));

var databaseHelper = require('./db/databaseHelper');
databaseHelper.connect('./db/db.json');

app.get('/', function(req, res) {
  res.render('index', {title: "Products and Articles"});
});

app.use('/products', productRoute);
app.use('/articles', articlesRoute);

if(!module.parent) {
  app.listen(3000);
}

module.exports = app;