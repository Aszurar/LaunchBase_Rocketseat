const db = require('../../config/db');
const { date } = require('../../lib/tools');

module.exports = {
    all(callback){
        // função que seleciona todos os instrutores da tabela de instrutores no banco 
        // de dados verifica se ocorreu algum erro nessa consulta, se não ocorreu, então
        // chame a função callback com todos esses instrutores:
        // Query -> Selecione todos os instrutores da tabela de instrutores
        // relacione a tabela de membros a de instrutores
        // por meio do atributo instructor_id da Entidade de Membros com 
        // o atributo identificador id da Entidade Instructors.
        // Assim, agrupe os instrutores que forem repetidos, ou seja ,aqueles que possuem 
        // relação com mais de um membro e conte essas associações e guarde em um novo
        // atributo chamado total_students
        // Por fim, retorne uma nova tabela, com todos intrutores(agrupados) com o atributo total_students
        // para cada instância de instrutor informando no total_studens a quantidade de associações
        // /relações que cada Instrutor possui.
        // 
        // Relacionamento Instrutores 1  <aula> N Membros 
        // Cada instrutor pode dar aula para vários membros, mas cada membros só
        // poderá ter aula  com 1 instrutor
        db.query(`
            SELECT instructors.*, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            GROUP BY instructors.id
            ORDER BY total_students DESC`, function (err, results) {
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
        // por fim, mostre os 
            if (err) throw `Database Erro! ${err}`
            console.log(results.rows[0]);

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
                // console.log(results.rows[0]);
        })
    },

    findBy(filter, callback){
        const query = `
            SELECT ins.*, count(me) AS total_students
            FROM instructors AS ins
            LEFT JOIN members AS me 
            ON (ins.id = me.instructor_id)
            WHERE ins.name ILIKE '%${filter}%'
            OR 
            ins.services ILIKE '%${filter}%'
            GROUP BY ins.id
            ORDER BY total_students DESC
            `        
        // Na função acima, temos que, estamos selecionando os instrutores
        // junto com o total_students com o left join
        // mas filtrando com a instrução ILIKE que procura 
        // no ins.name algo igual ao que é digitado no filter
        // ou seja, se o filter estiver somente como ana
        // irá buscar todas pessoas chamadas Ana, além de outros nomes
        // como Mariana, Diana, Indiana...., 
        db.query(query, function(err, results){
            if (err) throw `Database error ${err}`
            callback(results.rows)
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
            if (err) throw `Database erro! ${err}`
        
            callback()

        })

    },

    delete(id, callback){
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },

    paginate(params){
        // aqui ficará toda lógica de filtragem de dados do index e da paginação
        const {filter, limit, offset, callback } = params

        // Caso não tenha filtro, a subquery para retornar o total de instrutores será 
        // essa
        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM instructors) AS total`

        if (filter) {
            // Se a pessoa filtrar, então essa é a lógica dinâmica para que se tenha
            // o total de elementos filtrados
            filterQuery = ` WHERE instructors.name ILIKE '%${filter}%'
                            OR instructors.services ILIKE '%${filter}%'
                          `
            totalQuery = `(SELECT count(*) FROM instructors
                          ${filterQuery}
                          ) AS total`
        }

        // a subquery está representada  pela variável totalQuery que 
        // trará o total de elementos se estiver filtrado ou não,  para
        // que a paginação ocorra.
        query = `SELECT instructors.*, ${totalQuery}, 
                 count(members) AS total_students
                 FROM instructors
                 LEFT JOIN members
                 ON (instructors.id = members.instructor_id)
                 ${filterQuery}
                 GROUP BY instructors.id
                 ORDER BY total_students DESC
                 LIMIT $1 OFFSET $2
                `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw `Database erro: Ṕagination Function ${err}`
            
            callback(results.rows)
            // console.log(results.rows);
        })
    }
}