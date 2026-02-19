const { pool } = require("../config/db");

const findCategoryByName = async (name) => {
  return await pool.query("SELECT * FROM categories where name=$1", [name]);
};

const addCategory = async (name, employee_id) => {
  return await pool.query(
    "INSERT INTO categories (name,employee_id) VALUES ($1,$2) RETURNING id",
    [name, employee_id],
  );
};

const findCategoryById = async (id) => {
  return await pool.query("SELECT * FROM categories where id=$1", [id]);
};

const getAllCategories=async()=>{
     return await pool.query(`SELECT * FROM categories`);
}

const deleteCategoryById = async (id) => {
  return await pool.query("DELETE FROM categories WHERE id=$1", [id]);
};

module.exports = {
  findCategoryByName,
  addCategory,
  findCategoryById,
  deleteCategoryById,
  getAllCategories
};
