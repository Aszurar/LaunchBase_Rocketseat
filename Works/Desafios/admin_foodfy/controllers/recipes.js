const fs = require('fs')
const data = require('../data.json')


// exports.index = function(req, res){

//     return res.render("index", {index, recipes: data})
// }

// Criação
exports.create = function(req, res) {
    return res.render("admin/recipes/create")
}

exports.post = function(req, res){
    const keys = Object.keys(req.body);

    // Verificando se cada campo está preenchido!
    keys.forEach(key => {
        if(req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    });
    
    data.recipes.push({
        ...req.body,
    
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file erro!");

        return res.redirect("/about")
    });
}

exports.show = function(req, res){
    return res.render("admin/recipes/show")
}