var express = require('express');
var bodyParser = require('body-parser');
var pug = require('pug');
var app = express();

app.set('view engine', pug);
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', function(req, res) {
  res.json({success : true});
});

app.listen(3000);