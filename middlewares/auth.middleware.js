const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) { // token send unauthorized 
      res.status(401).json({ message: "Unauthorized" });
    }
    req.user = jwt.verify(token, process.env.JWT_SECRET); //verify token 
    next();
  } catch (e) {
    console.log(`Not valid user ${e.message}`);
    res.status(401).json({ message: "Invalid token" }); 
  }
};

// forbidden - 403