const mysql= require("mysql2");

const db=mysql.createConnection({
    host:"sql12.freesqldatabase.com",
    user:"sql12806189",
    database:"sql12806189",
    password:"1491658"
});

db.connect((error)=>{
    if(error){
        console.log("database connection error"+error);
    }
    else{console.log("database connection successfull")}
});

module.exports=db;