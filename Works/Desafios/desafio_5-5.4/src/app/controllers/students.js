// const { date, grade } = require('../tools');
const { date, grade } = require("../../lib/tools");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");


const create = {
    subtitle: ["Novo Aluno", "Editar Aluno"],
    titles: ["Avatar URL", "Nome", "Data de Nascimento", "Idade", "Email", "Ano Escolar", "Carga horária semanal", "Aniversário" ],
    grades: ["ano", "ano do Ensino Médio"],
    save: "Salvar"
}

module.exports = {
    index(req, res){
        const { filter } = req.query
        if ( filter ) {
            Student.findBy(filter)
            .then(function(results){
                let students = results.rows

                return res.render("students/index", { students, filter});                
            }).catch(function(err){
                throw new Error(err)
            })
        } else {
           Student.all()
           .then(function(results){
               let students = results.rows
               return res.render("students/index", { students });
           }).catch(function(err){
               throw new Error(err)
           })
        }
    },

    // Criar - criar - salvar dados
    create(req, res){

        Student.teachersOptions()
        .then(function(results){
            let teacherOptions = results.rows

            return res.render("students/create", { create, teaOptions: teacherOptions });
         }).catch(function(err){
             throw new Error(err)
         })
    },

    post(req, res){
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send("Please, fill al fields");
            }
        });
        
        Student.create(req.body)
        .then(function(results){
            const student = results.rows[0]
            return res.redirect(`/students/${student.id}`)
        }).catch(function(err){
            //lança um erro caso ocorra algo na inserção 
            throw new Error(err)
        })
    },

    // show
    show(req, res){
        Student.find(req.params.id)
        .then(function(results){
            let student = results.rows[0]
            if (!student) return res.send('Student not found')
            
            student.age = date(student.birth_date).birthDay
            student.grades = grade(student.grades)

            return res.render('students/show', { create, student })
        }).catch(function(err){
            throw new Error(err)
        })
    },

// update - mostrar - atualizar
    edit(req, res){
        Student.find(req.params.id)
        .then(function(results){
            let student = results.rows[0]
            student.birth = date(student.birth_date).iso

            Student.teachersOptions()
            .then(function(results){
                let teacherOptions = results.rows

                return res.render('students/edit', {create, student, teaOptions: teacherOptions})
            }).catch(function(err){
                throw new Error(err)
            })
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
        });

        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },

    // delete
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect('/students')
        })
    }

}