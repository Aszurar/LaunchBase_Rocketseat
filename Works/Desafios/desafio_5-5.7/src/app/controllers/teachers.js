const { age, graduation, type, classesArray, typeEdit, date } = require('../../lib/tools');
const Teacher = require('../models/Teacher');

const create = {
    subtitle: "Novo Professor",
    titles: ["Avatar URL", "Professor", "Data de Nascimento", "Grau de escolaridade", "Tipo de Aula"],
    type: ["Online", "Presencial"],
    level: ["Ensino Médio Completo", "Ensino Superio Completo", "Mestrado", "Doutarado"],
    save: "Salvar"
}

module.exports = {

    index(req, res){
        return res.render("teachers/index");
    },

    // Criar - criar - salvar dados
    create(req, res){
            return res.render("teachers/create");
    },

    post(req, res){

        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send("Please, fill al fields");
            }
        });
        
        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })
        
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

