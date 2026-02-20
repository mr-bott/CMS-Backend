const customError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const {
  addProduct,
  findProductById,
  deleteProductById,
  findProductBySlug,
  getAllproducts,
  updateProduct
} = require("./products.repository");

//add product
exports.addProduct = asyncHandler(async (req, res, next) => {
  const { seller_id, category_id, name, description, brand, price,product_slug } = req.body;

  // checking exist or not ? //unique - slug 
  const productExist = await findProductBySlug(product_slug);

  if (productExist.rows.length > 0) {
    return next(new customError("Product Already Exist", 400));
  }

  //adding category
  const result = await addProduct(
    seller_id,
    category_id,
    name,
    description,
    brand,
    price,
    product_slug
  );

  if (result.rows.length > 0) {
    res.status(201).json({
      message: "Product added successfully",
      id: result.rows[0].id,
    });
  }
});

//update product 
//add product
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const {id,seller_id, category_id, name, description, brand, price,product_slug } = req.body;

  // checking exist or not ? //unique - slug 
  const productExist = await findProductById(id);

  if (productExist.rows.length === 0) {
    return next(new customError("Product Not Exist", 400));
  }

  //adding category
  const result = await updateProduct(
    id,
    seller_id,
    category_id,
    name,
    description,
    brand,
    price,
    product_slug
  );

  if (result.rows.length > 0) {
    res.status(201).json({
      message: "Product added successfully",
      id: result.rows[0].id,
    });
  }
});


//all products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  //getting all products
  const result = await getAllproducts();

  if (result.rows.length > 0) {
    res.status(200).json({
      rows: result.rows,
    });
  }

  if (result.rows.length == 0) {
    return next(new customError("No Products Available", 200));
  }
});

//get Product By id 
exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  //getting Product
  const result = await findProductById(id);

  if (result.rows.length > 0) {
    res.status(200).json({
      rows: result.rows,
    });
  }

  if (result.rows.length == 0) {
    return next(new customError("No Products Available", 404));
  }
});

//delete Product by id 
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // checking exist or not
  const category = await findProductById(id);

  if (category.rows.length === 0) {
    return next(new customError("Product Not Exist", 400));
  }
  //deleting product
  const result = await deleteProductById(id);

  if (result.rows.length == 0) {
    res.status(201).json({
      message: "Product Deleted successfully",
    });
  }
});
