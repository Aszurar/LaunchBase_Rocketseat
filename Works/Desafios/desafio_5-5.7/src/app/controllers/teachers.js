const { age, graduation, type, classesArray, date, typeEdit } = require('../../lib/tools');
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
        Teacher.all(function(teachers) {
            for (let teacher of teachers) {
                teacher.classes = classesArray(teacher.subjects_taught)
            }

            return res.render("teachers/index", { teachers });
        })
    },

    // Criar - criar - salvar dados
    create(req, res){
            return res.render("teachers/create", { create });
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
        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) return res.send('Teacher not found')

            teacher.age = age(teacher.birth_date)
            // console.log(teacher.age);
            teacher.graduation = graduation(teacher.education_level)
            teacher.type = type(teacher.class_type)
            teacher.classes = classesArray(teacher.subjects_taught)
            teacher.created_at = date(teacher.created_at).format
            
            return res.render('teachers/show', { teacher })
        })
    },
    // update - mostrar - atualizar
    edit(req, res){
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send("Teacher not found")

            teacher.birth = date(teacher.birth_date).iso
            teacher.level = teacher.education_level
            teacher.type = typeEdit(teacher.class_type)
            teacher.classes = teacher.subjects_taught

            return res.render('teachers/edit', {create, teacher})
        })

    },

    put(req, res){
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send("Please, fill al fields");
            }
        });

        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`) 
        })
    },

    // delete
    delete(req, res){
        
        Teacher.delete(req.body.id, function(){
            return res.redirect('/teachers')
        })
    }
}

