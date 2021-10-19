const path = require('path');
const util= require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let __basedir= path.resolve();

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) =>{
        console.log(file.originalname);
        const newFileName= new Date().getTime()+"-"+file.originalname;
        cb(null, newFileName);
    }
});

let uploadFile = multer({
    storage:storage,
    limits:{fileSize:maxSize}
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports=uploadFileMiddleware;