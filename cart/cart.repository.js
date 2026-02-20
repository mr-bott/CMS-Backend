const { pool } = require("../config/db");

exports.isProductExistInCart = async (cart_id, product_id, quantity) => {
  return await pool.query(
    `SELECT * FROM cart_items WHERE  cart_id=$1 AND product_id=$2 RETURNING *`,
    [cart_id, product_id],
  );
};

exports.incrementProductInCart = async (cart_id, product_id) => {
  const result = await pool.query(
    `SELECT quantity from cart_items WHERE 
        cart_id=$1 AND product_id=$2`,
    [cart_id, product_id],
  );

  const quantity = result.rows[0].quantity;
  return await pool.query(
    `UPDATE cart_items SET quantity=$1 WHERE cart_id=$2 AND product_id=$3 RETURNING *`,
    [quantity + 1, cart_id, product_id],
  );
};

exports.addProductToCart = async (cart_id, product_id, quantity) => {
  return await pool.query(
    `INSERT INTO cart_items (cart_id,product_id,quantity) 
        VALUES ($1,$2,$3) RETURNING *`,
    [cart_id, product_id, quantity],
  );
};

exports.getAllItemsInCart = async () => {
  return await pool.query(`SELECT * FROM cart_items`);
};
