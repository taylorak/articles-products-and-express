var pgp = require('pg-promise')();

function database() {
  var env  = process.env.NODE_ENV || 'development';
  var dbConn;

  if(env === 'test') {
    dbConn = {
        host: 'localhost',
        port: 5432,
        database: 'blog_test',
        user: 'blogger'
    };
  }

  if(env === 'development') {
    dbConn = {
        host: 'localhost',
        port: 5432,
        database: 'blog_development',
        user: 'blogger'
    };
  }

  if(env === 'production') {
    dbConn = {
        host: 'localhost',
        port: 5432,
        database: 'blog_production',
        user: 'blogger'
    };
  }

  var conn = pgp(dbConn);
  return conn;
}

module.exports = database();