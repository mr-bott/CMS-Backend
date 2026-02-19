const {Pool}=require('pg');
const env=require('./env')

const pool=new Pool({
    user: env.USER,
    host: env.HOST,
    database: env.DATABASE,
    password: env.PASSWORD,
    port: env.DB_PORT
})

async function connectDB() {
    try{
        await pool.connect();
        console.log(`Connected to Database Successfully`);
    }
    catch(e){
        console.log(`Error while connecting to DB ${e.message}`);
    }
}

module.exports={
    pool,connectDB
}