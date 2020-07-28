const express = require('express'); //chamando o express para dentro da varíavel para que se transforme em uma função e seja executada
const nunjucks = require('nunjucks');//tamplate engine que é utilizado para ter funcionalidades de reutilizar códigos, 
//melhorar a efeiciência e otimização, apresentar páginas de novas maneiras


const server = express(); //executando o express

//configurando o servidor para que consiga exibir arquivos de estilos estáticos
server.use(express.static('public'));

//configurando o nunjucks para renderizar uma página html.
server.set("view engine", "html");
nunjucks.configure("views", {
    express: server
});

server.get("/", function(req, res){ //adicionando a rota do get, ouvindo uma requisição e respondendo ao cliente.
    return res.render("index"); //retornando o index como página inicial
});

server.listen(5000, function() {
    console.log("Server is runnning");
});