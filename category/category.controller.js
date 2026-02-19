const { pool } = require("../config/db");
const customError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const {
  findCategoryByName,
  addCategory,
  findCategoryById,
  getAllCategories,
  deleteCategoryById,
} = require("./category.repository");

exports.addCategory = asyncHandler(async (req, res, next) => {
  const { name, employee_id } = req.body;

  // checking exist or not
  const category = await findCategoryByName(name);

  if (category.rows.length > 0) {
    return next(new customError("Category Already Exist", 400));
  }
  //adding category
  const result = await addCategory(name, employee_id);

  if (result.rows.length > 0) {
    res.status(201).json({
      message: "Category added successfully",
      id: result.rows[0].id,
    });
  }
});

//get all categories
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  //getting all categories
  const result = await getAllCategories();
  
  if(result.rows.length>0){
    res.status(200).json({
      rows:result.rows
    })
  }
  
  if(result.rows.length==0){
    return next(new customError("No Categories Available",200));
  }

});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // checking exist or not
  const category = await findCategoryById(id);

  if (category.rows.length === 0) {
    return next(new customError("Category Not Exist", 400));
  }
  //adding category
  const result = await deleteCategoryById(id);

  if (result.rows.length == 0) {
    res.status(201).json({
      message: "Category Deleted successfully",
    });
  }
});
