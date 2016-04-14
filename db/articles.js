function articles_db(database) {

  return {
    all : _all,
    add : _add,
    getByTitle : _getByTitle,
    editByTitle : _editByTitle
  };
}

module.exports = articles_db();