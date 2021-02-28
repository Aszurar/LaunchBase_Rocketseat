const { age, graduation, type, classesArray, date, typeEdit } = require('../../lib/tools');
const Teacher = require('../models/Teacher');

const create = {
    subtitle: ["Novo Professor", "Editar Professor"],
    titles: ["Avatar URL", "Professor", "Data de Nascimento", "Grau de escolaridade", "Tipo de Aula"],
    type: ["Online", "Presencial"],
    level: ["Ensino Médio Completo", "Ensino Superio Completo", "Mestrado", "Doutarado"],
    save: "Salvar"
}

module.exports = {

    index(req, res){
        const { filter } = req.query

        if (filter) {
            Teacher.findBy(filter)
            .then(function(results){
                let teachers = results.rows

                for (let teacher of teachers) {
                    teacher.classes = classesArray(teacher.subjects_taught)
                }
            
                return res.render("teachers/index", { teachers, filter });
            }).catch(function(err){ 
                throw new Error(err)
            })
        } else {
            Teacher.all()
            .then(function(results) {
                let teachers = results.rows

                for (let teacher of teachers) {
                    teacher.classes = classesArray(teacher.subjects_taught)
                }
    
                return res.render("teachers/index", { teachers });
            }).catch(function(err) {
                throw new Error(err)
            })
        }
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
        
        Teacher.create(req.body)
        .then(function(results){
            // results.rows[0] retorna o id da nova instância(professor)
            const teacher = results.rows[0]
            return res.redirect(`/teachers/${teacher.id}`)
        }).catch(function(err){
            //lança um erro caso ocorra algo na inserção 
            throw new Error(err)
        })
        
    },

    show(req, res){
        Teacher.find(req.params.id)
        .then(function(results) {
            let teacher = results.rows[0]

            if(!teacher) return res.send('Teacher not found')

            teacher.age = age(teacher.birth_date)
            teacher.graduation = graduation(teacher.education_level)
            teacher.type = type(teacher.class_type)
            teacher.classes = classesArray(teacher.subjects_taught)
            teacher.created_at = date(teacher.created_at).format
            
            return res.render('teachers/show', { teacher })
        }).catch(function(err){
            throw new Error(err)
        })
    },
    // update - mostrar - atualizar
    edit(req, res){
        Teacher.find(req.params.id)
        .then(function(results) {
            let teacher = results.rows[0]
           
            if (!teacher) return res.send("Teacher not found")
            
            teacher.birth = date(teacher.birth_date).iso
            teacher.level = teacher.education_level
            teacher.type = typeEdit(teacher.class_type)
            teacher.classes = teacher.subjects_taught

            return res.render('teachers/edit', {create, teacher})
        }).catch(function(err){
            throw new Error(err)
        })

    },

    put(req, res){
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send("Please, fill al fields");
            }
        })

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

