const db = require('../../config/db')
const { date } = require('../../lib/tools')

module.exports = {
    all(callback){
        const query = `SELECT * FROM teachers ORDER BY name ASC`

        db.query(query, function (err, results){
            if(err) throw `Database error ${err}`
            
            console.log('Listagem:');
            console.log(results.rows);

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO teachers(
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.level,
            data.type,
            data.classes,
            date(Date.now()).iso
        ]
        
        db.query(query, values, function(err, results){
            if (err) throw `Database error! ${err}`

            console.log('Adição:');
            console.log(results.rows[0]);
            
            callback(results.rows[0])
        })
    },
    
    find(id, callback){
        const query = `SELECT * FROM teachers WHERE id = $1`
        const value = [id]

        db.query(query, value, function(err, results){
            if (err) `Database error ${err}`
            
            console.log('Busca Única:')
            console.log(results.rows[0]);

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
            UPDATE teachers SET
                avatar_url = ($1),
                name = ($2),
                birth_date = ($3),
                education_level = ($4),
                class_type = ($5),
                subjects_taught = ($6)
             WHERE id = $7
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.level,
            data.type,
            data.classes,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database error: ${err}`

            console.log('Edição: ');
            console.log(results.rows[0]);            
            
            callback()
        })
    },

    delete(id, callback){
        const query = `DELETE FROM teachers WHERE id = $1`
        const value = [id]
        
        db.query(query, value, function(err, results){
            if(err) throw `Datafese error! ${err}`
            
            return callback()
        })
    }
}