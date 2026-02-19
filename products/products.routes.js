const router = require("express").Router();
const { addProduct, deleteProduct, getAllProducts, getProductById } = require("./products.controller");
router.post("/add", addProduct);
router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
