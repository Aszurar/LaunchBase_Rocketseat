const db = require('../../config/db')
const { date } = require('../../lib/tools')

module.exports = {
    all(){
        const query = `
           SELECT tea.*, count(stu) AS total_students
           FROM teachers AS tea
           LEFT JOIN students AS stu
           ON ( tea.id = stu.teacher_id )
           GROUP BY tea.id
           ORDER BY total_students DESC
           `

        return db.query(query)
    },

    create(data){
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
        // retorna o objeto results com os dados da inserção
        return db.query(query, values)
    },
    
    find(id, callback){
        const query = `SELECT * FROM teachers WHERE id = $1`
        const value = [id]

        return db.query(query, value)
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

        return db.query(query, values)
    },

    delete(id){
        const query = `DELETE FROM teachers WHERE id = $1`
        const value = [id]
        
       return db.query(query, value)
    },

    findBy(filter){
        const query = `SELECT tea.*, count(stu) AS total_students
                       FROM teachers AS tea
                       LEFT JOIN students AS stu
                       ON ( tea.id = stu.teacher_id)
                       WHERE tea.name ILIKE '%${filter}%'
                       OR
                       tea.subjects_taught ILIKE '%${filter}%'
                       GROUP BY tea.id
                       ORDER BY total_students DESC
                      `
        return db.query(query)
    }
}