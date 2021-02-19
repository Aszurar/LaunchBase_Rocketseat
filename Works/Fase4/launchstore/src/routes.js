const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/ProductController')

routes.get('/', function (req, res){
    return res.render('layout')
})

// as funções do controle não são chamdas com () pois, com
// os () elas executam imediatamente, e o que nos queremos
// é que elas sóe xecuem quando aquela linha de código
// for executada.
routes.get('/products/create', ProductController.create)
routes.get('ads/create', function (req, res){
    return res.redirect('products/create')
})

module.exports = routes