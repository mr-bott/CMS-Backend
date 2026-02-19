const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const customError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const { findUserByEmail, createUser } = require("./auth.repository");

//signup
exports.getSignup = asyncHandler(async (req, res, next) => {
  const { name, age, email, password, phone } = req.body;

  //Check if user already exists
  const userExists = await findUserByEmail(email);

  if (userExists.rows.length > 0) {
    return next(new customError("User already Exists", 400));
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //insert user
  const newUser = await createUser(name, age, email, hashedPassword, phone);

  res.status(201).json({
    message: "User created successfully",
    id: newUser.rows[0].id,
  });
});

// login
exports.getLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // find user
  const user = await findUserByEmail(email);

  if (user.rows.length === 0) {
    return next(new customError("Invalid Credentails", 400));
  }

  // compare password
  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return next(new customError("Invalid Credentails", 400));
  }
  
  // generate JWT
  const token = generateToken(user);

  res.status(200).json({
    message: "Login successful",
    token,
  });
});
