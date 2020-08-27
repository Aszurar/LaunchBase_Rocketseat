const express = require('express');
const routes = express.Router();

routes.get("/", function(req, res){
    const index = {
        title: "SORVETÃO"
    };
    return res.render("index", {index: index});
});

routes.get("/students", function(req, res){
    return res.render("students");
});

module.exports = routes;