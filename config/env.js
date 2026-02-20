require("dotenv").config();

const env = {
  PORT: process.env.PORT,

  USER: process.env.USER,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  PASSWORD: process.env.PASSWORD,
  DB_PORT: process.env.DB_PORT,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

if (!env.USER || !env.HOST || !env.DATABASE || !env.PASSWORD || !env.DB_PORT) {
  console.log(`Database configuration ENV varaibles are missing`);
}

if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
  console.log(`Cloudinary ENV varaibles are missing`);
}
module.exports = env;
