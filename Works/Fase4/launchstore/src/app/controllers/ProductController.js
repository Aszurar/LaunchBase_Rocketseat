const Category = require('../models/Category')

module.exports = {
    create(req, res){
        // Pegar as Catergorias
        // Nos projetos anteriores utilizávamos callbacks
        // Mas, em determinado ponto, utilizar muitas callbacks
        // pode tornar o código confuso, não é recomendado.(Fila de Callbacks)
        // > O programa continua executando até terminar, e aí ele chama a callback da fila de callbacks
        // Então, uma alternativa são as promise, promessas!
        // Basicamente prometem fazer algo após a execuão de um função de
        // usando o método then ,a forma de tratar o erro tbm muda
        // uma db.query já está configurada como Promises
        // e ja retorna um results por isso não precisamos
        // passar um parâmetro ou retornar algo no all
        Category.all()
        .then(function(results) {
            const categories = results.rows
            
            return res.render('products/create.njk', { categories })
        }).catch(function(err) {
            // Se ocorre algum erro, então o lance!
            throw new Error(err)
        })

    }, 
    
    post(req, res){
// Lógica de salvar

    }
}