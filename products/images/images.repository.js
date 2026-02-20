const { pool } = require("../../config/db");

const saveImageWithProductId = async (product_id, image_url, is_primary) => {
  return await pool.query(
    `INSERT INTO product_images (product_id,image_url,is_primary)
        VALUES ($1,$2,$3) RETURNING id`,
    [product_id, image_url, is_primary],
  );
};

const getImageWithId=async(id)=>{
    return await pool.query(`SELECT * FROM product_images WHERE id=$1`,[id]);
}


const deleteImageWithId=async(id)=>{
    return await pool.query(`DELETE FROM product_images WHERE id=$1`,[id]);
}


module.exports={saveImageWithProductId ,getImageWithId,deleteImageWithId}