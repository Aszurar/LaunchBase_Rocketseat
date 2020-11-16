// const { date, grade } = require('../tools');
const { date, grade } = require("../../lib/tools");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");


const create = {
    subtitle: "Novo Aluno",
    titles: ["Avatar URL", "Nome", "Data de Nascimento", "Idade", "Email", "Ano Escolar", "Carga horária semanal", "Aniversário" ],
    grades: ["ano", "ano do Ensino Médio"],
    save: "Salvar"
}

module.exports = {
    index(req, res){
        Student.all(function(students){
            
            return res.render("students/index", { students });
        })
    },

    // Criar - criar - salvar dados
    create(req, res){
        return res.render("students/create", { create });
    },

    post(req, res){
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send("Please, fill al fields");
            }
        });
        
        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
    },

    // show
    show(req, res){
        Student.find(req.params.id, function(student){
            if (!student) return res.send('Student not found')
            
            student.age = date(student.birth_date).birthDay
            student.grades = grade(student.grades)

            return res.render('students/show', { create, student })
        })
    },

// update - mostrar - atualizar
    edit(req, res){
        Student.find(req.params.id, function(student){
            student.birth = date(student.birth_date).iso
            return res.render('students/edit', {create, student})  
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