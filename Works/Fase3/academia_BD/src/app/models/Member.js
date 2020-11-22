const db = require('../../config/db');
const { date } = require('../../lib/tools');

module.exports = {
    all(callback){
        // função que seleciona todos os instrutores da tabela de instrutores no banco 
        // de dados verifica se ocorreu algum erro nessa consulta, se não ocorreu, então
        // chame a função callback com todos esses instrutores:
        db.query(`SELECT * FROM members ORDER BY name ASC`, function (err, results) {
            // throw é usado para capturar o erro e lançar no console caso
            // ocorra, imprimido o que é passado
            // e parando toda aplicação 
            if (err) throw `Database Error ${err}` 
            callback(results.rows)
        })

    },

    create(data, callback){
        // função que recebe os dados do front end e cria um novo instrutor no banco
        // de dados, 
        // como parâmetro temos os dados que vem do front-end
        // e a função callback que retornar
        // crndo o tamplate
        // Instrução de consulta ao banco
        const query = `
            INSERT INTO members(
                name,
                avatar_url,
                gender,
                email,
                birth,
                blood,
                weight,
                height,
                instructor_id  
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ]

        // enviando dados para o banco de dados junto com suas credenciais
        // passamos por parâmetro a query(tamplate dos dados a serem gravaodos)
        // os valores que queremos guardar
        // e por ultimo uma função callbak que nos mostrará resultados e erros caso
        // ocorram
        db.query(query, values, function(err, results){
        //    Caso ocorra algum erro, mostre.
        // por fim, mostre os resultados
            console.log(err);
            console.log(results);

            // chamando a função que passará o novo instrutor que foi salvo
            callback(results.rows[0])
        })
    },

    find(id, callback){
        // função que procura no banco de dados, todos os membros e reliza um relacionamento
        // entre os instrutores aos membros que estão ta dando aula
        // construindo assim uma nova tabela com as 2 tabelas de instrutores associados aos 
        // membros correspondentes(pelo id)
        // É necessário alterar o nome da coluna de nomes dos professores
        // para que troque o . para _ , se não ocorrerá problemas no front-end

        db.query(`
            SELECT members.*, instructors.name AS instructor_name
            FROM members 
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id = $1`, [id], function(err, results){
                // throw é usado para capturar o erro e lançar no console caso
                // ocorra, imprimido o que é passado
                // e parando toda aplicação 
                if(err) throw `Database Error! ${err}` 
                callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
            UPDATE members SET
                name = ($1),
                avatar_url = ($2),
                gender = ($3),
                email = ($4),
                birth = ($5),
                blood = ($6),
                weight = ($7),
                height = ($8),
                instructor_id = ($9)
            WHERE id = $10
        `
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, function(err, results){
            // throw é usado para capturar o erro e lançar no console caso
            // ocorra, imprimido o que é passado
            // e parando toda aplicação 
            if (err) throw `Database erro ${err}`
        
        })

        callback()
    },

    delete(id, callback){
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },

    instructorsOptions(callback){
        db.query(`SELECT name, id FROM instructors`, function(err, results){
            if (err) throw `Database Erro! ${err}`
            
            callback(results.rows)
        }) 
    }
}