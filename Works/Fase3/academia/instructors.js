// trabalhando com arquivos do sistema, filesystem
const fs = require('fs');
// Arquivo json não precisa ter o modulo.export para ser exportado
const data = require('./data.json');

// show
exports.show = function(req, res) {
    const { id } = req.params;

    // returnando verdadeiro ou falso verificando o id da url para saber se é igual ao id do banco de dados
    // se for verdadeiro, então armazene os dados do usuário do banco de dados na variável
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    });

    if(!foundInstructor) return res.send("Instructor not found!");

    return res.send(foundInstructor);
}
// create
exports.post = function(req, res) {
    // req.body é o método usado para pegar dados do front end pelo método post
    
    // pegando todas chaves do objeto body que contem as chaves e os valores dos dados inseridos
    const keys = Object.keys(req.body);
    //Object é um construtor que criará um objeto, . keys é para pegar todas chaves do objeto passado como parâmetro
    // Com isso, o Keys será um vetor com todas chaves do body(objeto que possui os pares chaves e valor)

    keys.forEach(key => {
        // comparação para descobrir se alguma chave/input está vazio, se estiver, então mande uma mensagem ou renderize uma página
        // informando para o usuário preencher todos dados
        if(req.body[key] == ""){
            return res.send("Please, fill all fields!");
        }

    });
    // Desistruturando dados
    let {avatar_url, birth, name, services, gender} = req.body

    // Método parse do contrutor Date, pega o valor em string do método now e transforma em milisegundos da data padrão
    birth = Date.parse(birth);
  
    // Recebendo um novo dado, em que vem do construtor Date, que gera várias informações sobre datas
    // utilizando o método now para pegar as informações de datas atuais
    const created_at = Date.now();
    
    //atribuindo um id, um número para cada conjunto de dados
    const id = Number(data.instructors.length + 1);


     // adicionando objetos json no array instrucotrs, um após o outro [{;..}. {...},...]
     data.instructors.push({
         id,
         name,
         birth,
         gender,
         services,
         avatar_url,
         created_at
        });

    // criando o json para salavar os dados enviados pelo usuário
    // data.json
    // JSON.stringify(req.body) - transformando o req.body em um formato JSON
    // Callbackfunction, que retorna algo aavisando se hovue algum problema
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file erro!");

        return res.redirect("/instructors");
    });
    
    // return res.send(req.body);
}


// update

// delete