const fs = require('fs')
const data = require('../data')


exports.index = function(req, res){

    return res.render("index", {index, recipes: data})
}
