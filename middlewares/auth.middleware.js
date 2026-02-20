const jwt = require("jsonwebtoken");
const env=require("../config/env")

const auth= (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; //req.cookies.token
    if (!token) {
      // token send unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = jwt.verify(token,env.JWT_SECRET); //verify token
    next();
  } catch (e) {
    console.log(`Not valid user ${e.message}`);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Authorization 
const  authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports={
  auth,authorize
}

// forbidden - 403
