function articles(conn) {

  function getAll() {
    return conn.query('SELECT * FROM articles ORDER BY id ASC');
  }

  function addArticle(article) {
    return  conn.query('INSERT INTO articles (title, author, body, urltitle)' +
      'VALUES ($1, $2, $3, $4)', [article.title, article.author, article.body, encodeURIComponent(article.title)]);
  }

  function deleteArticle(title) {
    return conn.query('DELETE FROM articles WHERE title = $1', title);
  }

  function editArticle(title, article) {
    return conn.query('UPDATE articles SET title = $1, author = $2,' +
      ' body = $3, urltitle = $4 WHERE title = $5',
      [article.title, article.author, article.body, encodeURIComponent(article.title), title]);
  }

  function getArticle(title) {
    return conn.query('SELECT title, author, body FROM articles WHERE title = $1', title)
  }

  return {
    getAll : getAll,
    addArticle : addArticle,
    deleteArticle : deleteArticle,
    editArticle : editArticle,
    getArticle : getArticle


  };
}

module.exports = articles;