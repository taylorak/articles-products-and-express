DROP DATABASE IF EXISTS blog_test;
DROP DATABASE IF EXISTS blog_development;
DROP DATABASE IF EXISTS blog_production;

DROP USER IF EXISTS blogger;
CREATE USER blogger;

CREATE DATABASE blog_test OWNER blogger;
CREATE DATABASE blog_development OWNER blogger;
CREATE DATABASE blog_production OWNER blogger;

\c blog_test blogger;

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  price MONEY NOT NULL,
  inventory INTEGER NOT NULL
);

CREATE TABLE articles(
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  author varchar(255) NOT NULL,
  body TEXT NOT NULL,
  urltitle varchar(255) NOT NULL
);

\c blog_development blogger;

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  price MONEY NOT NULL,
  inventory INTEGER NOT NULL
);

CREATE TABLE articles(
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  author varchar(255) NOT NULL,
  body TEXT NOT NULL,
  urltitle varchar(255) NOT NULL
);

\c blog_production blogger;

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  price MONEY NOT NULL,
  inventory INTEGER NOT NULL
);

CREATE TABLE articles(
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  author varchar(255) NOT NULL,
  body TEXT NOT NULL,
  urltitle varchar(255) NOT NULL
);

