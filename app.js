var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var productRoute = require('./routes/products');
var articlesRoute = require('./routes/articles');
var logger = require('./lib/logger');
var allowTracking = require('./lib/allowTracking');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended : true }));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(allowTracking);
app.use(logger);

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