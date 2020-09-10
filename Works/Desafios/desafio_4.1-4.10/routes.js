const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');

routes.get("/", function(req, res){
    return res.redirect("/teachers");
});

routes.get("/teachers", function(req, res){
    return res.render("teachers/index");
});

routes.get("/teachers/create", function(req, res){
    const create = {
        subtitle: "Novo Professor",
        titles: ["Avatar URL", "Professor", "Data de Nascimento", "Grau de escolaridade", "Tipo de Aula"],
        type: ["Online", "Presencial"],
        level: ["Ensino Médio Completo", "Ensino Superio Completo", "Mestrado", "Doutarado"],
        save: "Salvar"
    }
    return res.render("teachers/create", { create });
});

routes.get("/teachers/:id", teachers.show);

routes.post("/teachers", teachers.post);

routes.get("/students", function(req, res){
    return res.render("students");
});

module.exports = routes;