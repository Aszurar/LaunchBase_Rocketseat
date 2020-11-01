const db = require('../../config/db');
const { age, date, service } = require('../../lib/tools');

module.exports = {
    all(callback){
        // função que seleciona todos os instrutores da tabela de instrutores no banco 
        // de dados verifica se ocorreu algum erro nessa consulta, se não ocorreu, então
        // chame a função callback com todos esses instrutores:
        db.query(`SELECT * FROM instructors`, function (err, results) {
            // throw é usado para capturar o erro e lançar no console caso
            // ocorra, imprimido o que é passado
            // e parando toda aplicação 
            if (err) throw `Database Error ${err}` 
            callback(results.rows)
        })

    },

    create(data, callback){
        // função que recebe os dados do front end e cria um novo instrutor no banco
        // de dados
        // craindo o tamplate
        // Instrução de consulta ao banco
        const query = `
            INSERT INTO instructors(
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso

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
        // função que procura no banco de dados, um instrutor em específico
        // pelo id, a query seria: Selecione todos os instrutores da tabela
        // Instructors onde seus id seja igual ao id passado no parâmetro
        // nesse caso só terá 1 id correspondente e com isso
        // passe o único instrutor que possui tal id 
        db.query(`
            SELECT * 
            FROM instructors 
            WHERE id = $1`, [id], function(err, results){
                // throw é usado para capturar o erro e lançar no console caso
                // ocorra, imprimido o que é passado
                // e parando toda aplicação 
                if(err) throw `Database Error! ${err}` 
                callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
            UPDATE instructors SET
                name = ($1),
                avatar_url = ($2),
                gender = ($3),
                services = ($4),
                birth = ($5)
            WHERE id = $6
        `
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
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
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
}