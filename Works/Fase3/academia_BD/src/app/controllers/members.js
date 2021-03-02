const Member = require('../models/Member');
const { date, bloods} = require('../../lib/tools');

const texts = {
    titles: ['Membros'],
    buttons: ['Novo', 'Filtrar', 'Editar'],
    legends: ['Pesquisar membro por nome ou email', 'Tabela dos Membros da Academia', 'Detalhes'],
    headTable: ['Membro', 'Email', 'Peso', 'Altura', 'Ação'],
    inputsFields: ['Avatar URL', 'Nome', 'Data de nascimento', 'Sexo', 'Masculino', 'Feminino', 'Tipo Sanguíneo', 'Instrutores', 'Aniversário', 'Aluno de']

}
module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1 
        limit = limit || 3
        offset = limit * (page - 1) 

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members){
                const pagination = {
                    total: Math.ceil(members[0].total / limit), 
                    page
                }
                return res.render("members/index", { members, pagination, filter, texts });
            }
        }
        Member.paginate(params)
    },
    
    // 
    create(req, res){

        Member.instructorsOptions(function(options){
            return res.render("members/create", { instructorsOptions: options, texts });
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
            member.blood = bloods(member.blood)
            return res.render("members/show", { member, texts })
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
                return res.render("members/edit", { member, instructorsOptions: options, texts });
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

