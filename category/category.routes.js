const router=require('express').Router();
const{addCategory,deleteCategory,getAllCategories}=require('../category/category.controller')
const validate = require("../middlewares/validate.middleware")
const{addCategorySchema,deletingCategorySchema}=require("./category.validationSchema")

router.post('/add',validate({body:addCategorySchema}),addCategory);
router.get("/",getAllCategories);
router.delete('/delete/:id',validate({params:deletingCategorySchema}),deleteCategory)


module.exports=router;