const express = require('express'); //chamando o express para dentro da varíavel para que se transforme em uma função e seja executada
const nunjucks = require('nunjucks');//tamplate engine que é utilizado para ter funcionalidades de reutilizar códigos, 
//melhorar a efeiciência e otimização, apresentar páginas de novas maneiras
const videos = require("./data"); //importando os dados do date.js
const portdata = require("./portfoliodata");
const certdata = require("./certdata");
const server = express(); //executando o express

//configurando o servidor para que consiga exibir arquivos de estilos estáticos
server.use(express.static("public"));

//configurando o nunjucks para renderizar uma página html.
server.set("view engine", "njk");
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true 
    // excluir os arquivos temporários para que não afete a reinicialização com visuais antigos
});

server.get("/", function(req, res){ //adicionando a rota do get, ouvindo uma requisição e respondendo ao cliente.
   const about = {
       avatar_url: "https://avatars1.githubusercontent.com/u/64987824?s=460&u=51e8a76f68447d04bb10d3f57e77df673874bad6&v=4",
       name: "Lucas de Lima",
       description: "Estudando programação com foco em Javascript, Python, HTML e CSS com o objetivo de se tornar um desenvolvedor fullstack",
       student: [
            {title: "Estudante", ufpb: "Universidade Federal da Paraíba", rocket: "Rocketseat"},
            {ufpb: "Engenharia da Computação", alt: "ufpb" },
            {launch: "LaunchBase"}
       ]

   }
   
    return res.render("index", {about: about}); //retornando e renderizando o index como página inicial
});


server.get("/portfolio", function(req, res){ 
    return res.render("portfolio", { port: portdata}); 
});

server.get("/projects", function(req, res){ 
    return res.render("projects", { items: videos }); //além de retornar e renderizar a página de projetos, também passa os dados do date.js 
});

server.get("/certificates", function(req, res){ 
    return res.render("certificates", {cert: certdata});
});

server.use(function(req, res){
    const errodata = {
        title: "ERRO 404 | Página não encontrada!",
        number: "404",
        description: "Desculpe, mas o conteúdo solicitado não esta disonível ou a página não existe. <br><br> Verifique o nome do endereço solicitado.",
        info: "ERRO"
    }

    res.status(404).render("not-found", { errodata: errodata});
});

server.listen(5000, function() {
    console.log("Server is runnning");
});