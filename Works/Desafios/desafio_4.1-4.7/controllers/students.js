const fs = require('fs');
const data = require('../data.json');
const { date, grade } = require('../tools');

const create = {
    subtitle: "Novo Aluno",
    titles: ["Avatar URL", "Nome", "Data de Nascimento", "Idade", "Email", "Ano Escolar", "Carga horária semanal", "Aniversário" ],
    grades: ["ano", "ano do Ensino Médio"],
    save: "Salvar"
}

exports.index = function(req, res){
    return res.render("students/index", { students: data.students});
}

// Criar - criar - salvar dados
exports.create = function(req, res){
    return res.render("students/create",  { create }  );
}
exports.post = function(req, res){

    const keys = Object.keys(req.body);

    keys.forEach(key => {
        if(req.body[key] == ""){
            return res.send("Please, fill al fields");
        }
    });

    let {avatar_url, birth, name, email, grades, credits} = req.body

    birth = Date.parse(birth);

    let id = 1
    let lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        id,
        name,
        birth,
        email,
        grades,
        credits,
        avatar_url,
    }); 


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('write file erro!');
        
        return res.redirect("/students");
    });

}

// show
exports.show = function(req, res){
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    });

    if(!foundStudent) return res.send("Professor não encontrado!.");

    const student = {
        ...foundStudent,

        age: date(foundStudent.birth).birthDay,
        grades: grade(foundStudent.grades)
    }

    return res.render("students/show", { student, create });
}

// update - mostrar - atualizar
exports.edit = function(req, res){
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    }); 

    if(!foundStudent) return res.send("Professor não encontrado!.");

    const student = {
        ...foundStudent,
        
        birth: date(foundStudent.birth).iso,
    }


    return res.render("students/edit", { student, create })
}
exports.put = function(req, res){
    let { id } = req.body
    let index = 0;
    
    const foundStudent = data.students.find(function(student, foundIndex){

        if(id == student.id){
            index = foundIndex; 
            return true; 
        }
    });

    if(!foundStudent) return res.send("Professor não encontrado!");

    const student = {
        ...foundStudent,
        ...req.body,

        birth: Date.parse(req.body.birth),
        id: Number(id)
    }

    data.students[index] = student;
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file erro");

        return res.redirect(`/students/${id}`);
    })

}

// delete
exports.delete = function(req, res){
    const { id } = req.body;
    
    const filteredStudent = data.students.filter(function(student){
         return id != student.id
        
    });

    data.students = filteredStudent;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file erro!.");

        return res.redirect("/students");
    });
}



