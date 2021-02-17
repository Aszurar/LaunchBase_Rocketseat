const Instructor = require('../models/Instructor');
const { age, date, service } = require('../../lib/tools');
const texts = {
    titles: ['Instrutores'],
    buttons: ['Novo', 'Filtrar'],
    legends: ['Pesquisar o instrutor pelo nome ou atendimento', 'Tabela dos Instrutores da Academia', ],
    headTable: ['Instrutor', 'Atendimento', 'Alunos', 'Ação']
}
module.exports = {
    
    index(req, res){
        //PAGINAÇÃO!
        let { filter, page, limit } = req.query

        // quantidade de páginas
        page = page || 1 
        //limite de dados mostrados na tela em cada página 
        // Nesse caso, o padrão é mostrar 3 dados em cada página
        limit = limit || 3
        //quais dados serão mostrados na tela, a partir de qual dado mostrará na tela
        // de acordo com a página selecionada
        offset = limit * (page - 1) 
        // Lógica de mostrar na 1º página a partir do elemento 0 da tabela,
        // contar 3 elementos e na próxima página mostrar a partir do elemento 3
        /* exp:
        pagina 1 -> limit = 3 -> offset = 3 * (1 - 1) -> offset = 0 Mostrar a partir do elemento 0 na 1º página
        pagina 2 -> limit = 3 -> offset = 3 * (2 - 1) -> offset = 3 Mostrar a partir do elemento 3 na 2º página
        pagina 3 -> limit = 3 -> offset = 3 * (3 - 1) -> offset = 6 Mostrar a partir do elemento 6 na 3º página
            ...
        */  

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors){
                for (let instructor of instructors) {
                    instructor.services = service(instructor.services)
                }

                //Abaixo, o total é a quantidade de páginas
                const pagination = {
                    total: Math.ceil(instructors[0].total / limit), 
                    page
                }
                
                return res.render("instructors/index", { instructors, pagination, filter, texts });
            }
        }

        Instructor.paginate(params)
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



