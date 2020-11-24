const Instructor = require('../models/Instructor');
const { age, date, service } = require('../../lib/tools');

module.exports = {
    
    index(req, res){
        //PAGINAÇÃO!
        let { filter, page, limit } = req.query

        // quantidade de páginas
        page = page || 1 
        //limite de dados mostrados na tela em cada página 
        // Nesse caso, o padrão é mostrar 2 dados em cada página
        limit = limit || 2
        //quais dados serão mostrados na tela, a partir de qual dado mostrará na tela
        // de acordo com a página selecionada
        offset = limit * (page - 1) 
        // Lógica de mostrar na 1º página a partir do elemento 0 da tabela,
        // contar 2 elementos e na próxima página mostrar a partir do elemento 1

        const params = {
            page,
            limit,
            offset,
            callback(instructors){
                for (let instructor of instructors) {
                    instructor.services = service(instructor.services)
                }
                
                return res.render("instructors/index", { instructors, filter });
            }
        }

        Instructor.paginate(params)

        // if ( filter ) {
            // Instructor.findBy(filter, function(instructors){
                // for (let instructor of instructors) {
                    // instructor.services = service(instructor.services)
                // }
                // return res.render("instructors/index", { instructors, filter });
            // })
        // } else {
            // chamando a função que retorna todos os intrutores do banco de dados
            // Instructor.all(function(instructors){ 
                // for (let instructor of instructors) {
                    // instructor.services = service(instructor.services)
                // }
                // return res.render("instructors/index", { instructors });
            // })
// 
        // }
    },
    
    // 
    create(req, res){
        return res.render("instructors/create");
    },
    
    post(req, res){
        
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }

        });
        // chamando a função que cria um novo instrutor, ou no banco de dados
        // é enviado o req.body para ela, que são os dados vindo do front-end
        // e uma função que terá como parâmetro esse novo instrutor
        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructors/${instructor.id}`);
        })
    },

    show(req, res){
        // chamando função que procura o instrutor na tabela pelo id
        // esse id é passado pela rota
        Instructor.find(req.params.id, function(instructor){
            if (!instructor) return res.send('Instructor not found!')

            // aplicação de funções que mmodificam os dados para melhor visualização
            // no navegador
            instructor.age = age(instructor.birth)
            instructor.services = service(instructor.services)
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },

    edit(req, res){
        // função que que procura o instutor para a edição
        Instructor.find(req.params.id, function(instructor){
            if (!instructor) return res.send("Database Erro")
            // tratamento da data de aniversário para que ela seja passa no front-end
            // no formato do input.date   
            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", { instructor })
        })
        
    },

    put(req, res){
                
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }

        });

        Instructor.update(req.body, function(){
            return res.redirect(`/instructors/${req.body.id}`)
        })        
    },

    delete(req, res){
        Instructor.delete(req.body.id, function(){
            return res.redirect('/instructors')
        })  
        
    }
}



