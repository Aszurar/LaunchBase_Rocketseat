const fs = require('fs');
const data = require('../data.json');
const { age, graduation, type, classesArray, typeEdit, date } = require('../tools');

const create = {
    subtitle: "Novo Professor",
    titles: ["Avatar URL", "Professor", "Data de Nascimento", "Grau de escolaridade", "Tipo de Aula"],
    type: ["Online", "Presencial"],
    level: ["Ensino Médio Completo", "Ensino Superio Completo", "Mestrado", "Doutarado"],
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

    let {avatar_url, birth, name, type, classes, level} = req.body

    birth = Date.parse(birth);
    const created_at = Date.now();

    const id = Number(data.students.length + 1);

    data.students.push({
        id,
        name,
        type,
        birth,
        level,
        classes: classesArray(req.body.classes),
        avatar_url,
        created_at
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

        age: age(foundStudent.birth),
        graduation: graduation(foundStudent.level),
        type: type(foundStudent.type),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at),
    }

    return res.render("students/show", { student });
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
        
        type: typeEdit(foundStudent.type),
        birth: date(foundStudent.birth),
        classes: classesArray(foundStudent.classes)
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
        classes: classesArray(req.body.classes)
    }

    console.log(student);

    data.students[index] = student;
    
    console.log(data.students[index]);

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



