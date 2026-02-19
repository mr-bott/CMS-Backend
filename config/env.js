require("dotenv").config();

const env = {
  PORT: process.env.PORT,

  USER: process.env.USER,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  PASSWORD: process.env.PASSWORD,
  DB_PORT: process.env.DB_PORT,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

if(!env.USER||!env.HOST||!env.DATABASE||!env.PASSWORD||!env.DB_PORT){
    console.log(`Database configuration ENV varaibles are missing`);
};

module.exports=env;

