const fs = require('fs');
const data = require('../data.json');
const { age, graduation, type, classesArray, typeEdit, date } = require('../tools');

const create = {
    subtitle: ["Novo Professor", "Editar Professor", "Detalhes"],
    titles: ["Avatar URL", "Professor", "Data de Nascimento", "Grau de escolaridade", "Tipo de Aula"],
    type: ["Online", "Presencial"],
    level: ["Ensino Médio Completo", "Ensino Superio Completo", "Mestrado", "Doutarado"],
    save: "Salvar"
}

exports.index = function(req, res){
    return res.render("teachers/index", { teachers: data.teachers});
}

// Criar- salvar dados
exports.create = function(req, res){
    return res.render("teachers/create",  { create } );
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

    let id = 1
    let lastTeacher = data.teachers[data.teachers.length - 1];

    if (lastTeacher) {
        id = lastTeacher.id + 1;
    }

    data.teachers.push({
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
        
        return res.redirect("/teachers");
    });

}

// show
exports.show = function(req, res){
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    });

    if(!foundTeacher) return res.send("Professor não encontrado!.");

    const teacher = {
        ...foundTeacher,

        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.level),
        type: type(foundTeacher.type),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", { teacher, create });
}
// update - mostrar - atualizar
exports.edit = function(req, res){
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    }); 

    if(!foundTeacher) return res.send("Professor não encontrado!.");

    const teacher = {
        ...foundTeacher,
        
        type: typeEdit(foundTeacher.type),
        birth: date(foundTeacher.birth).iso,
        classes: classesArray(foundTeacher.classes)
    }


    return res.render("teachers/edit", { teacher, create })
}
exports.put = function(req, res){
    let { id } = req.body
    let index = 0;
    
    const foundTeacher = data.teachers.find(function(teacher, foundIndex){

        if(id == teacher.id){
            index = foundIndex; 
            return true; 
        }
    });

    if(!foundTeacher) return res.send("Professor não encontrado!");

    const teacher = {
        ...foundTeacher,
        ...req.body,

        birth: Date.parse(req.body.birth),
        classes: classesArray(req.body.classes),
        id: Number(id)
    }

    data.teachers[index] = teacher;    

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file erro");

        return res.redirect(`/teachers/${id}`);
    })

}

// delete
exports.delete = function(req, res){
    const { id } = req.body;
    
    const filteredTeacher = data.teachers.filter(function(teacher){
         return id != teacher.id
        
    });

    data.teachers = filteredTeacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file erro!.");

        return res.redirect("/teachers");
    });
}



