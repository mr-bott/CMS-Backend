const router = require("express").Router();

const { getSignup, getLogin } = require("./auth.controller");
const validate =require("../middlewares/validate.middleware")
const {signupSchema,loginSchema} =require("./auth.validationSchema")

router.post("/signup", validate({body:signupSchema}),getSignup);
router.post("/login",  validate({body:loginSchema}),getLogin);

module.exports = router;
