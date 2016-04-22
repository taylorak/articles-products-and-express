function products(conn) {

  function getAll() {
    return conn.query('SELECT * FROM products ORDER BY id ASC');
  }

  function addProduct(product) {
    return conn.query('INSERT INTO products (name, price, inventory)' +
      'VALUES ($1, $2, $3)', [product.name, product.price,
      product.inventory]);
  }

  function deleteProduct(id) {
    return conn.query('DELETE FROM products WHERE id = $1', id);
  }

  function editProduct(id, product) {
    return conn.query('UPDATE products SET name = $1, price = $2,' +
      ' inventory = $3 WHERE id = $4',
      [product.name, product.price, product.inventory, id]);
  }

  function getProduct(id) {
    return conn.query('SELECT name, price, inventory FROM products WHERE id = $1', id)
  }

  return {
    getAll : getAll,
    addProduct : addProduct,
    deleteProduct : deleteProduct,
    editProduct : editProduct,
    getProduct : getProduct
  };
}

module.exports = products;