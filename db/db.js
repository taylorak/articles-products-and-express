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

// seed test database
if(env === 'test') {

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
  });

}

module.exports = conn;