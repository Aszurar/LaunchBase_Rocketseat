const Instructor = require('../models/Instructor');
const { age, date, service } = require('../../lib/tools');

module.exports = {
    
    index(req, res){

        const { filter } = req.query

        if ( filter ) {
            Instructor.findBy(filter, function(instructors){
                for (let instructor of instructors) {
                    instructor.services = service(instructor.services)
                }
                return res.render("instructors/index", { instructors, filter });
            })
        } else {
            // chamando a função que retorna todos os intrutores do banco de dados
            Instructor.all(function(instructors){ 
                for (let instructor of instructors) {
                    instructor.services = service(instructor.services)
                }
                return res.render("instructors/index", { instructors });
            })

        }
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



