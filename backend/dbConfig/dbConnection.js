const msql = require('mysql2');

const dbConnection = msql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
dbConnection.connect((err)=>{
    if(err){
        console.log("database connection Error !", err);
    } else {
        console.log("database connected successfully !");
    }
})
module.exports = dbConnection.promise();