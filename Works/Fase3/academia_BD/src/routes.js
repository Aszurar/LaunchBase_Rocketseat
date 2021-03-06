const express = require('express');
const routes = express.Router();
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')

// HTTP - PROTOCÓLO DE TRANSFERÊNCIA DE DADOS DE HYPERTEXT
// VERBS:
// Resource > Uma entidade/recurso que representa o objeto real ou abstrado a ser atualizado/adicionado/deletado
// GET: Receber         
// POST: Criar/Salvar um Novo Resource
// PUT: Atualizar um Resource
// Delete: Deletar Resource

routes.get('/', function(req, res) {
    return res.redirect("/instructors");
})

routes.get('/instructors', instructors.index);
routes.get('/instructors/create', instructors.create);
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/edit', instructors.edit);
routes.post('/instructors', instructors.post);
routes.put('/instructors', instructors.put);
routes.delete('/instructors', instructors.delete);

routes.get('/members', members.index);
routes.get('/members/create', members.create);
routes.get('/members/:id', members.show);
routes.get('/members/:id/edit', members.edit);
routes.post('/members', members.post);
routes.put('/members', members.put);
routes.delete('/members', members.delete);

module.exports = routes