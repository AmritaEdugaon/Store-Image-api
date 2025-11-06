const express=require("express");
const multer=require("multer");
const path=require("path");
const db=require("./db");
const { request } = require("http");
const { error } = require("console");

//This is used to get the port number from the hosting platform's variable
const PORT = process.env.PORT || 3000;

const app =express();
app.use(express.json());

app.use("/uploads",express.static("uploads"));

const storage=multer.diskStorage({
    destination:(request,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(request,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({storage});

app.post("/uploads",upload.single("image"),(request,response)=>{
    const imageName=request.file.filename;
    const insertsql="INSERT INTO images (path)VALUES(?)";

    db.query(insertsql,[imageName],(error,result)=>{
        if(error)return response.status(500).json({
            "message":"database error",
            error:error.message
        })
        response.status(201).json({
            message: "Image uploaded successfully!",
            image_url: `http://localhost:3000/uploads/${imageName}`
        });  
    })
})

app.post("/uploads-multiple",upload.array("images"),(request,response)=>{
    const imageName=request.files.filename;
    const insertsql="INSERT INTO images (path)VALUES(?)"

    db.query(insertsql,[imageName],(error,result)=>{
        if(error)return response.status(500).json({
            "message":"database error",
            error:error.message
        })
        response.status(201).json({
            message: "Image uploaded successfully!",
            image_url: `http://localhost:3000/uploads/${imageName}`
        });
    })
});

app.listen(PORT,(error)=>{
    if(error)return console.log("error"+error);
 console.log(`Server running on http://localhost:${PORT}`);
});