function products_db() {

  return {
    all : _all,
    add : _add,
    getById : _getById,
    editById : _editById
  };
}

module.exports = products_db();