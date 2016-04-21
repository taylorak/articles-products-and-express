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
  body TEXT NOT NULL
);