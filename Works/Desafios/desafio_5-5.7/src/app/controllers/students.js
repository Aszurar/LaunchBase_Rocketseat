const { date, grade } = require('../tools');

const create = {
    subtitle: "Novo Aluno",
    titles: ["Avatar URL", "Nome", "Data de Nascimento", "Idade", "Email", "Ano Escolar", "Carga horária semanal", "Aniversário" ],
    grades: ["ano", "ano do Ensino Médio"],
    save: "Salvar"
}

module.exports = {
    index(req, res){
        return res.render("students/index");
    },

    // Criar - criar - salvar dados
    create(req, res){
        return res.render("students/create");
    },

    post(req, res){

        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send("Please, fill al fields");
            }
        });

        let {avatar_url, birth, name, email, grades, credits} = req.body
    
        return 
    },

    // show
    show(req, res){
        return
    },

// update - mostrar - atualizar
    edit(req, res){
        return
    },

    put(req, res){
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send("Please, fill al fields");
            }
        });

        return
    },

    // delete
    delete(req, res){
        return    
    }

}