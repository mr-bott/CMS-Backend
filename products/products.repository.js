const { pool } = require("../config/db");

const addProduct = async (
  seller_id,
  category_id,
  name,
  description,
  brand,
  price,
  product_slug,
) => {
  return await pool.query(
    `INSERT INTO products 
        (seller_id,category_id, name, description, brand, price,product_slug) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [seller_id, category_id, name, description, brand, price, product_slug],
  );
};
const updateProduct = async (
  id,
  seller_id,
  category_id,
  name,
  description,
  brand,
  price,
  product_slug,
) => {
  return await pool.query(
    `UPDATE products 
     SET seller_id = $1,
         category_id = $2,
         name = $3,
         description = $4,
         brand = $5,
         price = $6,
         product_slug = $7,
         updated_at = NOW()
     WHERE id = $8
     RETURNING *`,
    [seller_id, category_id, name, description, brand, price, product_slug, id],
  );
};
const findProductById = async (id) => {
  return await pool.query(`SELECT * FROM products WHERE id=$1`, [id]);
};

const findProductBySlug = async (product_slug) => {
  return await pool.query(`SELECT * FROM products WHERE product_slug=$1`, [
    product_slug,
  ]);
};

const getAllproducts = async () => {
  return await pool.query(`
    SELECT 
    p.id,
    p.seller_id,
    p.category_id,
    p.name,
    p.description,
    p.brand,
    p.price,
    p.is_active,
    p.created_at,
    p.updated_at,
    p.product_slug,
    ARRAY_AGG(pi.image_url) AS images
FROM products p
LEFT JOIN product_images pi
    ON p.id = pi.product_id
GROUP BY p.id;
    `);
};

const deleteProductById = async (id) => {
  return await pool.query(`DELETE FROM products WHERE id=$1`, [id]);
};

module.exports = {
  addProduct,
  findProductById,
  deleteProductById,
  findProductBySlug,
  getAllproducts,
  updateProduct,
};
