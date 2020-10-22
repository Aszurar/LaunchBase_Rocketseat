// trabalhando com arquivos do sistema, filesystem
const fs = require('fs');
// Arquivo json não precisa ter o modulo.export para ser exportado
const data = require('../data.json');

const { date, bloods } = require('../tools');

// index
exports.index = function(req, res) {
    return res.render("members/index", { members: data.members });
}

// create
exports.create = function(req, res) {
    return res.render("members/create");
}

// POST
exports.post = function (req, res) {
    // req.body é o método usado para pegar dados do front end pelo método post

    // pegando todas chaves do objeto body que contem as chaves e os valores dos dados inseridos
    const keys = Object.keys(req.body);
    //Object é um construtor que criará um objeto,
    //. keys é para pegar todas chaves do objeto passado como parâmetro
    // Com isso, o Keys será um vetor com todas chaves do body(objeto que possui os pares chaves e valor)

    keys.forEach(key => {
        // comparação para descobrir se alguma chave/input está vazio, se estiver, então mande uma mensagem ou renderize uma página
        // informando para o usuário preencher todos dados
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
        }

    });

    // Método parse do contrutor Date, pega o valor em string do método now e
    // transforma em milisegundos da data padrão
    birth = Date.parse(req.body.birth);

    //atribuindo um id, um número para cada conjunto de dados de forma que não se repita 
    // os ID e garanta que um membro tenha uma ID novo, um número que ainda não tenha sido escolhido
    let id = 1;
    let lastMember = data.members[data.members.length - 1];
    
    if (lastMember) {
        id = lastMember.id + 1;
    }

    // adicionando objetos json no array instrucotrs, um após o outro [+ {,..,...}]
    data.members.push({
        id,
        ...req.body,
        birth
    });

    // criando o json para salvar os dados enviados pelo usuário
    // data.json
    // JSON.stringify(req.body) - transformando o req.body em um formato JSON
    // Callbackfunction, que retorna algo avisando se hovue algum problema
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file erro!");

        return res.redirect("/members");
    });

}

// SHOW
exports.show = function (req, res) {
    const { id } = req.params;

    // retornando verdadeiro ou falso, assim verificando o id da url para saber se é igual 
    // ao id do banco de dados se for verdadeiro, então armazene na variável foundMember
    const foundMember = data.members.find(function (member) {
        return member.id == id;
    });

    if (!foundMember) return res.send("Member not found!");

    const member = {
        // espalhando os dados do foundMembers aqui
        ...foundMember,

        // formatando os dados para a apresentação no navegador
        birth: date(foundMember.birth).birthDay,
        blood: bloods(foundMember.blood)
    }

    return res.render("members/show", { member });
}

// update
exports.edit = function (req, res) {

    const { id } = req.params;

    // returnando verdadeiro ou falso verificando o id da url para saber se é igual ao id do banco de dados
    // se for verdadeiro, então armazene os dados do usuário do banco de dados na variável
    const foundMember = data.members.find(function (member) {
        return member.id == id;
    });

    if (!foundMember) return res.send("Member not found!");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
    }


    return res.render("members/edit", { member });
}

//updaterealese
exports.put = function (req, res) {
    const { id } = req.body;
    // Nos casos do put e delete pegamos o id do formulário, e quem passa são os inputs
    // hidden que ficam próximos aos buttons de submit
    let index = 0;

    const foundMember = data.members.find(function (member, foundIndex) {
        if (id == member.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundMember) return res.send("Instrutor não encontrado!.");

    const member = {
        ...foundMember,
        ...req.body,

        birth: Date.parse(req.body.birth),
        id: Number(id),
    }

    // atualizando o instrutor no array de intrutores do data com as novas informações 
    // digitadas no re.body
    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write file erro");

        return res.redirect(`/members/${id}`);
    });
}

// delete
exports.delete = function(req, res){
    const { id } = req.body;

    // Percorrendo um a um intrutor do data.json, e caso ele tenha o id diferente do atual,
    // então retorna verdadeiro e ele é salvo nesse novo array de instrutores. 
    // Caso ele seja igual ao id atual, então retorna falso e com isso ele não
    // é adicionado nesse novo array de instrutores
    const filteredMembers = data.members.filter(function(member){
        return member.id != id;
    });

    data.members = filteredMembers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file erro!");

        return res.redirect("/members");
    });

}



