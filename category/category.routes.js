const router=require('express').Router();
const{addCategory,deleteCategory,getAllCategories}=require('../category/category.controller')
const validate = require("../middlewares/validate.middleware")
const {auth,authorize}=require("../middlewares/auth.middleware")
const{addCategorySchema,deletingCategorySchema}=require("./category.validationSchema")

router.post('/add',auth,authorize("admin"),validate({body:addCategorySchema}),addCategory);
router.get("/",auth,authorize("admin"),getAllCategories);
router.delete('/delete/:id',auth,authorize("admin"),validate({params:deletingCategorySchema}),deleteCategory)

module.exports=router;