const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const methodOverride = require('method-override');
const routes = require('./routes')

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))

server.use(methodOverride('_method'))
// configurando para que use o arquivo routes como o arquivo que contém todas rotas
server.use(routes)

server.set('view engine', 'njk')
nunjucks.configure("src/app/views", {
    express: server,
    noCache: true
})

server.get('/', function (req, res){
    return res.render('layout')
})


server.listen(5000, function () {
    console.log('Server is Running');
})


