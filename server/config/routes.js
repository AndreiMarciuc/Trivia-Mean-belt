var mongoose=require("mongoose");
var users = require(".././controllers/users.js");
var path=require('path');

module.exports=function(app){

    app.post("/login", function(req,res){
        users.login(req,res);
    });

    app.get("/session",function(req,res){
        users.checksession(req,res);
    });

    app.get("/clearsession",function(req,res){
        users.clearsession(req,res);
    });

    app.get("/getusers", function(req,res){
        users.getall(req,res);
    });

    app.post("/deleteuser", function(req,res){
        users.delete(req,res);
    });

    app.post("/addquestion", function(req,res){
        users.addquestion(req,res);
    });
    
    app.get("/allquestions", function(req,res){
        users.getallquestions(req,res);
    });

    app.post("/postgame", function(req,res){
        users.postgame(req,res);
    });
    app.get("/allgames", function(req,res){
        users.allgames(res,res);
    });

    app.all('*',(req,res,next)=>{
        res.sendFile(path.resolve('./client/dist/index.html'));
    });

};