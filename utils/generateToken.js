const jwt = require("jsonwebtoken");
const env = require("../config/env");

module.exports = (user) => {
  return jwt.sign(
    { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  );
};
