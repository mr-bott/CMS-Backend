const asyncHandler = require("../utils/asyncHandler");
const customError = require("../utils/customError");
const {
  isProductExistInCart,
  incrementProductInCart,
  addProductToCart,
  getAllItemsInCart,
} = require("./cart.repository");

exports.addItemToCart = asyncHandler(async (req, res, next) => {
  const { cart_id, product_id, quantity } = req.body;

  //check for procduct already exist if then increment
  const productExist = await isProductExistInCart(cart_id, product_id);

  // if already exist increment its quantity
  if (productExist.rows.length > 0) {
    const incrementProduct = await incrementProductInCart(
      cart_id,
      product_id,
      quantity,
    );

    //increment successfully
    if (incrementProduct.rows.length > 0) {
      return res.status(200).json({
        message: "product Incremented Successfully",
      });
    }

    // throw error
    return next(new customError("product Increment Failed"), 400);
  }

  // add product into the cart
  const addProduct = await addProductToCart(cart_id, product_id, quantity);

  // successfully added
  if (addProduct.rows.length > 0) {
    return res.status(200).json({
      message: "product added to cart successfully",
    });
  }
  //throw error
  return next(new customError("Failed to Add Product into Cart"));
});

exports.getAllCartItems = asyncHandler(async (req, res, next) => {
  //get all items in cart
  const result = await getAllItemsInCart();

  if (result.rows.length > 0) {
    return res.status(200).json({
      rows: result.rows,
    });
  }

  //throw error if no items found
  return next(new customError("No Items in Cart", 400));
});
