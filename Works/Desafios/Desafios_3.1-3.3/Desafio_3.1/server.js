const express = require('express');
const nunjucks = require('nunjucks');
const { timeLog } = require('console');

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");
nunjucks.configure("views", {
    express:server
});

server.get("/", function(req, res){
    return res.render("index");
});

server.get("/about", function(req, res){
    return res.render("about");
});

server.get("/courses", function(req, res){
    return res.render("courses");
});

server.listen("5005", function(){
    console.log("Server is running");
    
})

