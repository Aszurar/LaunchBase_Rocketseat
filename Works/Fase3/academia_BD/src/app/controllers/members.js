const Member = require('../models/Member');
const { age, date} = require('../../lib/tools');

module.exports = {
    index(req, res){
        // chamando a função que retorna todos os intrutores do banco de dados
        Member.all(function(members){ 
            return res.render("members/index", { members });
        })
    },
    
    // 
    create(req, res){

        Member.instructorsOptions(function(options){
            return res.render("members/create", { instructorsOptions: options });
        })

    },
    
    post(req, res){
        
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }

        });
        // chamando a funçãp que cria um novo instrutor, ou no banco de dados
        // é enviado o req.body para ela, que são os dados vindo do front-end
        // e uma função que terá como parâmetro esse novo instrutor
        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`);
        })
    },

    show(req, res){
        // chamando função que procura o instrutor na tabela pelo id
        // esse id é passado pela rota
        Member.find(req.params.id, function(member){
            if (!member) return res.send('Member not found!')

            // aplicação de funções que mmodificam os dados para melhor visualização
            // no navegador
            member.birth = date(member.birth).birthDay

            return res.render("members/show", { member })
        })
    },

    edit(req, res){
        // função que que procura o instutor para a edição
        Member.find(req.params.id, function(member){
            if (!member) return res.send("Database Erro")
            // tratamento da data de aniversário para que ela seja passa no front-end
            // no formato do input.date   
            member.birth = date(member.birth).iso

            Member.instructorsOptions(function(options){
                return res.render("members/edit", { member, instructorsOptions: options });
            })
        })
        
    },

    put(req, res){
                
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }

        });

        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })        
    },

    delete(req, res){
        Member.delete(req.body.id, function(){
            return res.redirect('/members')
        })  
        
    }
}

