const express = require('express');
const routes = express.Router();
const recipes = require('./controllers/recipes');
const data = require('./data');

routes.get("/", function (req, res) {
    const index = {
        title: "Foodfy",
        slogan: "As melhores receitas",
        info: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.",
        pet: "chef",
        text: "Receitas",
        copyright: "Todos direitos reservados, receitas Foodfy.",
    };

    return res.render("index", { index, recipes: data });
});

routes.get("/about", function (req, res) {
    const about = {
        title: "Sobre",
        subtitle: "Sobre o Foodfy",
        about: " Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.<br><br>Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
        info: "Como tudo começou…",
        startinfo: "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.<br><br> Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
        recipes: "Nossas receitas",
        recipesinfo: "Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
        copyright: "Todos direitos reservados, receitas Foodfy."
    };

    return res.render("about", { about })
})

routes.get("/recipes", function (req, res) {
    const recipe = {
        title: "Receitas"
    };

    return res.render("recipes", { recipe, recipes: data })
})

routes.get("/recipe/:index", function (req, res) {
    
    const recipeIndex = req.params.index;
    const info = {
        subtitle: ["Ingredientes", "Modo de preparo", "Informações adicionais"]

    };
    
    return res.render("recipe", { info, recipe: data[recipeIndex] })
})


// ADMIN
// Mostrar formulário de nova receita
routes.get("/admin/recipes/create", recipes.create);
// MOstrar detalhers de uma nova receita
routes.get("/admin/recipes/:id", recipes.show);
// Editar Receitas:
routes.get('/admin/recipes/:id/edit', recipes.edit)

// Cadastrar nova receita
routes.post("/admin/recipes", recipes.post);





module.exports = routes