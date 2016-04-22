var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

var app = require('../app');
var conn = require('../db/db');

describe('articles routes', function() {

  beforeEach(function(done) {
    conn.query('DROP TABLE IF EXISTS articles')
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
      return conn.query("INSERT INTO articles(title, author, body, urltitle) " +
        "VALUES ('test_title', 'test_author', 'test_body', 'test_title')");
    })
    .then(function() {
      done();
    });

  });

  describe('POST /articles', function() {
    it('should return true on valid post', function(done) {
      request(app)
      .post('/articles')
      .type('form')
      .send({
        title : 'test',
        author : 'test',
        body : 'test'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body.success).to.be.true;
        expect(res.body.redirect).to.equal('/articles');
        done();
      });
    });
  });

  describe('PUT /articles/:title', function() {
    it('should return true on valid update', function(done) {
      request(app)
      .put('/articles/test_title')
      .type('form')
      .send({
        title : 'test_update',
        author : 'test_update',
        body : 'test_update',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body.success).to.be.true;
        expect(res.body.redirect).to.equal('/articles');
        done();
      });
    });
  });

  describe('DELETE /article/:title', function() {
    it('should return true on valid delete', function(done) {
      request(app)
      .delete('/articles/test_title')
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

  describe('GET /articles', function() {
    it('should return an html page', function(done) {
      request(app)
      .get('/articles')
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

  describe('GET /articles/:title/edit', function() {
    it('should return an html page', function(done) {
      request(app)
      .get('/articles/test_title/edit')
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

  describe('GET /articles/new', function() {
    it('should return an html page', function(done) {
      request(app)
      .get('/articles/new')
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