var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

var app = require('../app');
var conn = require('../db/db');

describe('products routes', function() {

  beforeEach(function(done) {
    conn.query('DROP TABLE IF EXISTS products')
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
      return conn.query("INSERT INTO products(name, price, inventory) " +
        "VALUES ('test_name', 5, 5)");
    })
    .then(function() {
      done();
    });

  });

  describe('POST /products', function() {
    it('should return true on valid post', function(done) {
      request(app)
      .post('/products')
      .type('form')
      .send({
        name : 'test',
        price : 10,
        inventory : 10
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body.success).to.be.true;
        expect(res.body.redirect).to.equal('/products');
        done();
      });
    });
  });

  describe('PUT /products/:id', function() {
    it('should return true on valid update', function(done) {
      request(app)
      .put('/products/1')
      .type('form')
      .send({
        name : 'test_update',
        price : 20,
        inventory : 20,
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body.success).to.be.true;
        expect(res.body.redirect).to.equal('/products');
        done();
      });
    });
  });

  describe('DELETE /products/:id', function() {
    it('should return true on valid delete', function(done) {
      request(app)
      .delete('/products/1')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('GET /products', function() {
    it('should return an html page', function(done) {
      request(app)
      .get('/products')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('GET /products/:id/edit', function() {
    it('should return an html page', function(done) {
      request(app)
      .get('/products/1/edit')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('GET /products/new', function() {
    it('should return an html page', function(done) {
      request(app)
      .get('/products/new')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

});