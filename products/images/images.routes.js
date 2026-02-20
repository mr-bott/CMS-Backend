const router=require('express').Router();
const {addImage,deleteImage}=require("./images.controller")
const upload=require("../../middlewares/multer")
const {auth,authorize}=require("../../middlewares/auth.middleware")

router.post("/image/:id",auth,authorize("admin"),upload.array("images", 5),addImage);
router.delete("/image/:id",auth,authorize("admin"),deleteImage);

module.exports=router;