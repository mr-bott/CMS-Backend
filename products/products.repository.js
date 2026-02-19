const { pool } = require("../config/db");
const { getAllProducts } = require("./products.controller");

const addProduct = async (
  seller_id,
  category_id,
  name,
  description,
  brand,
  price,
) => {
  return await pool.query(
    `INSERT INTO products 
        (seller_id,category_id, name, description, brand, price) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
    [seller_id, category_id, name, description, brand, price],
  );
};

const findProductById=async(id)=>{
    return await pool.query(`SELECT * FROM products WHERE id=$1`,[id]);
}

const findProductByName=async(name)=>{
    return await pool.query(`SELECT * FROM products WHERE name=$1`,[name]);
}

const getAllproducts= async()=>{
    return await pool.query(`SELECT * FROM products`);
}

const deleteProductById=async(id)=>{
    return await pool.query(`DELETE FROM products WHERE id=$1`,[id]);
}

module.exports = {
  addProduct,
  findProductById,
  deleteProductById,
  findProductByName,
  getAllproducts
};
