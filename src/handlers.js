const fs = require('fs');
const path = require('path');
const handleHomePage = (req,res)=>{
    const filePath=path.join(__dirname,'..','public','index.html')
    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.writeHead(500,{"Content-Type":"text/html"});
            console.log(err);
            res.end("<h1>Server Error</h1>")
        }
        else{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.end(data)
        }
    })
}
const handlePublicFiles = (req,res,endpoint)=>{
    const filePath=path.join(__dirname,'..',endpoint)
    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.writeHead(500,{"Content-Type":"text/html"});
            res.end("<h1>Server Error</h1>")
        }
        else{
            // res.writeHead(200,{"Content-Type":"text/html"});
            res.end(data)
        }
    })
}
module.exports={handleHomePage,handlePublicFiles};
