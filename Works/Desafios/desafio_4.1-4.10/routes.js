const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');

const create = {
    subtitle: "Novo Professor",
    titles: ["Avatar URL", "Professor", "Data de Nascimento", "Grau de escolaridade", "Tipo de Aula"],
    type: ["Online", "Presencial"],
    level: ["Ensino Médio Completo", "Ensino Superio Completo", "Mestrado", "Doutarado"],
    save: "Salvar"
}

routes.get("/", function(req, res){
    return res.redirect("/teachers");
});

routes.get("/teachers", function(req, res){
    return res.render("teachers/index");
});

routes.get("/teachers/create", function(req, res){
    
    return res.render("teachers/create",  { create }  );
});

routes.get("/teachers/:id", teachers.show);

routes.post("/teachers", teachers.post);

routes.get("/teachers/:id/edit", teachers.edit);

routes.get("/students", function(req, res){
    return res.render("students");
});



routes.use(function (req, res) {
    const errodata = {
        title: "ERRO 404 | Página não encontrada!",
        number: "404",
        description: "Desculpe, mas o conteúdo solicitado não esta disonível ou a página não existe. <br><br> Verifique o nome do endereço solicitado.",
        info: "ERRO"
    }
    res.status(404).render("not-found", { errodata: errodata });
});

module.exports = routes;