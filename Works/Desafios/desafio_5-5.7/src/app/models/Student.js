const db = require("../../config/db")
const { date } = require("../../lib/tools")


module.exports = {
    all(callback){
        const query = `SELECT * FROM students`
        
        db.query(query, function(err,results){
            if(err) throw `Database error: ${err}`

            console.log('Listagem:');
            console.log(results.rows);

            callback(results.rows)
        })
    },
    
    create(data, callback){
        const query = `
            INSERT INTO students(
                avatar_url,
                name,
                birth_date,
                email,
                grades,
                credits
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.grades,
            data.credits
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error: ${err}`

            console.log('Adição: ');
            console.log(results.rows[0]);

            callback(results.rows[0])
        })
    },

    find(id, callback){
        const query = `SELECT * FROM students WHERE id = $1`
        const value = [id]
        
        db.query(query, value, function(err, results){
            if(err) `Database error ${err}`
            
            console.log('Busca de 1 instância:');
            console.log(results.rows[0]);

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
            UPDATE students SET
                avatar_url = ($1),
                name = ($2),
                birth_date = ($3),
                email = ($4),
                grades = ($5),
                credits = ($6)
            WHERE id = $7 
            `
        const values = [
            data.avatar_url,
            data.name,
            data.birth,
            data.email,
            data.grades,
            data.credits,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error: ${err}`
                
                console.log('Edição: ');
                console.log(results.rows[0]);

            callback()
        })
    },

    delete(id, callback){
        const query = `DELETE FROM students WHERE id = $1`
        const value = [id]

        db.query(query, value, function(err, results){
            if(err) throw `Database error: ${err}`
           
            return callback()
        })
    }
}