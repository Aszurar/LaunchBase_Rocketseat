const express = require('express');
const routes = express.Router();
const instructors = require('./instructors')

// HTTP - PROTOCÓLO DE TRANSFERÊNCIA DE DADOS DE HYPERTEXT
// VERBS:
// GET: Receber          // Resource > Uma entidade/recurso que representa o objeto real ou abstrado a ser atualizado/adicionado/deletado
// POST: Criar ou Salvar um Novo Resource
// PUT: Atualizar um Resource
// Delete: Deletar Resource

routes.get('/', function(req, res) {
    return res.redirect("/instructors");
})

routes.get('/instructors', function(req, res) {
    return res.render("instructors/index");
});

routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create");
});

routes.get('/instructors/:id', instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.post('/instructors', instructors.post);

routes.put('/instructors', instructors.put);

routes.get('/members', function(req, res) {
    return res.send("members");
});

module.exports = routes