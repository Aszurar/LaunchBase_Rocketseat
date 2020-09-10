const fs = require('fs');
const data = require('./data.json');
const { age, graduation, type, classes, typeEdit } = require('./tools');

const create = {
    subtitle: "Novo Professor",
    titles: ["Avatar URL", "Professor", "Data de Nascimento", "Grau de escolaridade", "Tipo de Aula"],
    type: ["Online", "Presencial"],
    level: ["Ensino Médio Completo", "Ensino Superio Completo", "Mestrado", "Doutarado"],
    save: "Salvar"
}

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
        classes: classes(foundTeacher.classes),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", { teacher });
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

    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        id,
        name,
        type,
        birth,
        level,
        classes,
        avatar_url,
        created_at
    }); 


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('write file erro!');
        
        return res.redirect("/teachers");
    });

}

exports.edit = function(req, res){
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    }); 

    if(!foundTeacher) return res.send("Professor não encontrado!.");

    const teacher = {
        ...foundTeacher,
        
        type: typeEdit(foundTeacher.type),
    }


    return res.render("teachers/edit", { teacher, create })
}
