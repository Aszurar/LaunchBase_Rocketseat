const express = require('express');
const routes = express.Router();
const teachers = require('./controllers/teachers');
const students = require('./controllers/students');

routes.get("/", function(req, res){
    return res.redirect("/teachers");
});
routes.get("/teachers", teachers.index);
routes.get("/teachers/create", teachers.create);
routes.get("/teachers/:id", teachers.show);
routes.post("/teachers", teachers.post);
routes.get("/teachers/:id/edit", teachers.edit);
routes.put("/teachers", teachers.put);
routes.delete("/teachers", teachers.delete);


routes.get("/students", students.index);
routes.get("/students/create", students.create);
routes.get("/students/:id", students.show);
routes.post("/students", students.post);
routes.get("/students/:id/edit", students.edit);
routes.put("/students", students.put);
routes.delete("/students", students.delete);


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