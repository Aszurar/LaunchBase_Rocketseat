const express = require('express');
const routes = express.Router();

routes.get('/', function(req, res) {
    return res.redirect("/instructors");
})

routes.get('/instructors', function(req, res) {
    return res.render("instructors/index");
});

routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create");
});

routes.post('/instructors', function(req, res) {
    // req.body é o método usado para pegar dados do front end pelo método post
    
    // pegando todas chaves do objeto body que contem as chaves e os valores dos dados inseridos
    const keys = Object.keys(req.body);
    //Object é um construtor que criará um objeto, . keys é para pegar todas chaves do objeto passado como parâmetro
    // Com isso, o Keys será um veto com todas chaves do body(objeto que possui os pares chaves e valor)

    keys.forEach(key => {
        // comparação para descobrir se alguma chave/input está vazio, se estiver, então mande uma mensagem ou renderize uma página
        // informando para o usuário preencher todos dados
        if(req.body[key] == ""){
            return res.send("Please, fill all fields!");
        }

    });
    
    return res.send(req.body);
})

routes.get('/members', function(req, res) {
    return res.send("members");
})

module.exports = routes