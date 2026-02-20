const router = require("express").Router();
const { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } = require("./products.controller");
const {auth,authorize}=require("../middlewares/auth.middleware")

router.post("/add",auth,authorize("admin"), addProduct);
router.get("/",auth,authorize("admin"),getAllProducts);
router.get("/:id",auth,authorize("admin"),getProductById);
router.put("/:id",auth,authorize("admin"),updateProduct);
router.delete("/delete/:id",auth,authorize("admin"), deleteProduct);

module.exports = router;
