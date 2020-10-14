const fs = require('fs')
const data = require('../data.json')

const names = {
    subtitle: ["Receita:", "Ingredientes", "Modo de preparo", "Informações adicionais"],
    editButton: "Editar receita"
}

// Listagem
exports.index = function(req, res){
    return res.render("admin/recipes/index", {recipes: data})
}

// Criação
exports.create = function(req, res) {
    return res.render("admin/recipes/create")
}

exports.post = function(req, res){
    // const keys = Object.keys(req.body);
    console.log(req.body);
    // Verificando se cada campo está preenchido!
    // keys.forEach(key => {
    //     if(req.body[key] == "") {
    //         return res.send("Please, fill all fields!")
    //     }
    // });

    const { title, chef, thumbnail, ingredients, preparation, info} = req.body
    
    let id = 1;
    let lastRecipe = data.recipes[data.recipes.length -1] 

    if(lastRecipe){
        id = lastRecipe.id + 1
    }

    data.recipes.push({
        id,
        chef,
        info,
        title, 
        thumbnail,
        ingredients,
        preparation,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file erro!");

        return res.redirect(`/admin/recipes/${id}`)
    });
}

// Detalhes de cada receita!
exports.show = function(req, res){
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id 
    })

    if(!foundRecipe) return res.send("Receita não encontrada!");

    const recipe = {
        ...foundRecipe,
    }

    return res.render("admin/recipes/show", { recipe, names})
}

// Edição de cada receita!
exports.edit = function(req, res){
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Receita não encontrada!")

    const recipe = {
        ...foundRecipe
    }

    return res.render("admin/recipes/edit", { recipe, names })
}

exports.put = function(req, res){
    const { id } = req.body
    let index = 0


    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(id == recipe.id){
            index = foundIndex
            return true
        }
    })

    const recipe = {
        ...foundRecipe,
        ...req.body,
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file erro!.')
    })

    return res.redirect(`/admin/recipes/${id}`)
}