const mysql= require("mysql2");

const pool=mysql.createPool({
    host:"sql12.freesqldatabase.com",
    user:"sql12806189",
    database:"sql12806189",
    password:"pkUffdcwrR",
    connectionLimit:10
});

pool.getConnection((error,connection)=>{
    if(error){
        console.log("database connection error"+error);
    }
    else{
        console.log("database connection successfull");
        connection.release();
    }
});

module.exports=pool;