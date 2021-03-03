const Category = require('../models/Category')
const Product = require('../models/Product')
const { formatPrice } = require('../../lib/utils')
const texts = {
    titles: ['Novo Produto', 'Editar Produto'],
    buttons: ['Salvar', 'Atualizar', 'Deletar']
}

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
            // results.rows - array de todas instâncias da tabela de categorias
            const categories = results.rows
            
            return res.render('products/create.njk', { categories, texts })
        }).catch(function(err) {
            // Se ocorre algum erro, então o lance!
            throw new Error(err)
        })

    }, 
    
    async post(req, res){
    // Lógica de salvars
        const keys = Object.keys(req.body)

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send(`Por favor, preencha todos os campos!`)
                
            }
        })

        // para cada função que usar await é necessário colocar um async
        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        return res.redirect(`/products/${productId}`)
    },

    async edit(req, res){

        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if (!product) return res.send("Product not found")

        product.price = formatPrice(product.price)
        product.old_price = formatPrice(product.old_price)

        results = await Category.all()
        const categories = results.rows

        return res.render('products/edit.njk', { product, categories, texts } )
    },

    async put(req, res){
        const keys = Object.keys(req.body)

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send("Please fill all fields")
            }
        })

        req.body.price = req.body.price.replace(/\D/g, "")
        
        if (req.body.old_price != req.body.price) {
            // caso o produto tenha um novo preço, então busque pelo preço antigo e atualize o o old_price
            const results = await Product.find(req.body.id)
            req.body.old_price = results.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect(`/products/${req.body.id}/edit`)

    },

    async delete(req, res) {
        await Product.delete(req.body.id)

        return res.redirect('/')
    }
}