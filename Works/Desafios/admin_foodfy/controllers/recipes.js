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
    console.log(req.body);
    // Verificando se cada campo está preenchido!
    // keys.forEach(key => {
    //     if(req.body[key] == "") {
    //         return res.send("Please, fill all fields!")
    //     }
    // });
    
    // let id = 1;
    // let lastRecipe = data.recipes[data.recipes.length -1] 

    // if(lastRecipe){
    //     id = lastRecipe.id + 1
    // }

    // data.recipes.push({
    //     id,
    //     ...req.body,
    
    // })

    // fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    //     if(err) return res.send("Write file erro!");

    //     return res.redirect("/admin/recipes/show")
    // });
}

exports.show = function(req, res){
    return res.render("admin/recipes/show")
}