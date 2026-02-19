const {pool} = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND is_active = true",
    [email]
  );
  return result;
};

// Create new user
const createUser = async ( name, age, email, password, phone ) => {
  const result = await pool.query(
    `INSERT INTO users (name, age, email, password, phone)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [name, age, email, password, phone]
  );

  return result;
};

module.exports = {
  findUserByEmail,
  createUser
};
