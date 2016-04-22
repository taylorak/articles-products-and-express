var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var pgp = require('pg-promise')();


var env  = process.env.NODE_ENV || 'development';

if(env === 'test') {
    var dbConn = {
      host: 'localhost',
      port: 5432,
      database: 'blog_test',
      user: 'blogger'
  };
}

if(env === 'development') {
  var dbConn = {
      host: 'localhost',
      port: 5432,
      database: 'blog_development',
      user: 'blogger'
  };
}

if(env === 'production') {
  var dbConn = {
      host: 'localhost',
      port: 5432,
      database: 'blog_production',
      user: 'blogger'
  };
}

var conn = pgp(dbConn);

if(env === 'test') {
  console.log('test');

  conn.query('DROP TABLE IF EXISTS products')
  .then(function() {
    return conn.query('DROP TABLE IF EXISTS articles');
  })
  .then(function() {
    return conn.query('CREATE TABLE products(' +
      'id SERIAL PRIMARY KEY,' +
      'name varchar(255) NOT NULL,' +
      'price MONEY NOT NULL,' +
      'inventory INTEGER NOT NULL' +
      ')'
    );
  })
  .then(function() {
    return conn.query('CREATE TABLE articles(' +
      'id SERIAL PRIMARY KEY,' +
      'title varchar(255) NOT NULL,' +
      'author varchar(255) NOT NULL,' +
      'body TEXT NOT NULL,' +
      'urltitle varchar(255) NOT NULL'+
      ')'
    );
  })
  .then(function() {
    console.log('DONE');
  })
  .catch(function(error) {
    console.error(error);
  });

}

var productRoute = require('./routes/products');
var articlesRoute = require('./routes/articles');
var logger = require('./lib/middleware/logger');
var allowTracking = require('./lib/middleware/allowTracking');
var products = require('./models/products');
var articles = require('./models/articles');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended : true }));

app.use(function(req, res, next) {
  req.products = products(conn);
  req.articles = articles(conn);
  next();
});

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(allowTracking);
app.use(logger);

app.use('/products', productRoute);
app.use('/articles', articlesRoute);

app.use(function(req, res) {
  res.status(404).render('error/404');
});

if(!module.parent) {
  app.listen(3000);
}

module.exports = app;