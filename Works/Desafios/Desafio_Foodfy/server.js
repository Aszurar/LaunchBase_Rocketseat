const express = require('express');
const nunjucks = require('nunjucks');
const recipes = require('./data');

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");
nunjucks.configure("views", {
    express: server
});

server.get("/", function(req, res){
    const index = {
        title: "Foodfy",
        slogan: "As melhores receitas",
        info: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.",
        pet: "chef",
        text: "Receitas",
        copyright: "Todos direitos reservados, receitas Foodfy.",
    };
    return res.render("index", {recipes: recipes, index: index});
});

server.get("/recipe", function(req, res){
    return res.render("recipe", {recipes: recipes});
});

server.listen(5001, function() {
    console.log("Server is running");
});