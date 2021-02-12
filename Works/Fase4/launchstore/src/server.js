const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const methodOverride = require('method-override');

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))

server.use(methodOverride('_method'))
// server.use(routes)

server.set('view engine', 'njk')
nunjucks.configure("src/app/views", {
    express: server
})

server.get('/', function (req, res){
    return res.render('layout')
})


server.listen(5000, function () {
    console.log('Server is Running');
})


