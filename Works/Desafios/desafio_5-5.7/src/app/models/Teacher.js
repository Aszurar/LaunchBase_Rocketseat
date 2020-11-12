const db = require('../../config/db')

module.exports = {
    create(data, callback){
        const query = `
            INSERT TO teachers(
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
            ) VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            data.birth_date,
            data.education_level,
            data.class_type,
            data.subjects_taught
        ]
        
        db.query(query, values, function(err, results){
            if (err) throw `Database Erro! + ${err}`
            console.log(err);
            console.log(results.row[0]);
            
            callback(results.row[0])
        })
    }
}