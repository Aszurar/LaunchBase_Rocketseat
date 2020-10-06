 const express = require('express');
 const nunjucks = require('nunjucks');
 const routes = require('./routes');
 const methodOverride = require('method-override');
 
 const server = express();

 server.use(express.urlencoded({ extended: true }));
 server.use(express.static("public"));
//  configurando para que o post seja sobescrito por put antes do servidor ir para as rotas
 server.use(methodOverride('_method'))
 server.use(routes);

//  .use, .set, dentre outros são middleware, que são configurações feitas no servidor desde quando criado até antes de ficar online,
// "configurações do meio do caminho"

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(5005, function() {
    console.log("Server is running");
});
