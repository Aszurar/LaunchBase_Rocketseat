 const express = require('express');
 const nunjucks = require('nunjucks');
 const routes = require('./routes');
 
 const server = express();

 server.use(express.urlencoded({ extended: true }));
 server.use(express.static("public"));
 server.use(routes);

//  .use, .set, dentre outros são middleware, que são configurações feitas no servidor desde quando criado até antes de ficar online,
// "configurações do meio do caminho"

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(5010, function() {
console.log("Server is running");
});
