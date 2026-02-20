const router = require("express").Router();
const { auth, authorize } = require("../middlewares/auth.middleware");
const { addItemToCart, getAllCartItems } = require("./cart.controller");

router.post("/add", auth, authorize("admin"), addItemToCart);
router.get("/", auth, authorize("admin"), getAllCartItems);
// router.delete();

module.exports = router;
