const express = require('express'); //chamando o express para dentro da varíavel para que se transforme em uma função e seja executada
const nunjucks = require('nunjucks');//tamplate engine que é utilizado para ter funcionalidades de reutilizar códigos, 
//melhorar a efeiciência e otimização, apresentar páginas de novas maneiras
const videos = require("./data"); //importando os dados do date.js

const server = express(); //executando o express

//configurando o servidor para que consiga exibir arquivos de estilos estáticos
server.use(express.static("public"));

//configurando o nunjucks para renderizar uma página html.
server.set("view engine", "njk");
nunjucks.configure("views", {
    express: server
});

server.get("/", function(req, res){ //adicionando a rota do get, ouvindo uma requisição e respondendo ao cliente.
    return res.render("index"); //retornando e renderizando o index como página inicial
});


server.get("/portfolio", function(req, res){ 
    return res.render("portfolio"); 
});

server.get("/projects", function(req, res){ 
    return res.render("projects", { items: videos }); //além de retornar e renderizar a página de projetos, também passa os dados do date.js 
});

server.get("/certificates", function(req, res){ 
    return res.render("certificates");
});

server.listen(5000, function() {
    console.log("Server is runnning");
});