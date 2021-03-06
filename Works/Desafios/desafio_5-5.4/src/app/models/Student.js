const db = require("../../config/db")
const { date } = require("../../lib/tools")


module.exports = {
    all(){
        const query = `SELECT * FROM students
                       ORDER BY name
                       `
        
        return db.query(query)
    },
    
    create(data){
        const query = `
            INSERT INTO students(
                avatar_url,
                name,
                birth_date,
                email,
                grades,
                credits,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.grades,
            data.credits,
            data.teacher
        ]

        return db.query(query, values)
    },

    find(id){
        // É necessário alterar o nome da coluna de nomes dos professores
        // para que troque o . para _ , se não ocorrerá problemas no front-end
        const query = `SELECT students.*, teachers.name AS teacher_name
                       FROM students
                       LEFT JOIN teachers
                       ON ( students.teacher_id = teachers.id ) 
                       WHERE students.id = $1
           `
        const value = [id]
        
        return db.query(query, value)
    },

    update(data){
        const query = `
            UPDATE students SET
                avatar_url = ($1),
                name = ($2),
                birth_date = ($3),
                email = ($4),
                grades = ($5),
                credits = ($6),
                teacher_id = ($7)
            WHERE id = $8 
            `
        const values = [
            data.avatar_url,
            data.name,
            data.birth,
            data.email,
            data.grades,
            data.credits,
            data.teacher,
            data.id
        ]

        return db.query(query, values)
    },

    delete(id){
        const query = `DELETE FROM students WHERE id = $1`
        const value = [id]

        return db.query(query, value)
    },

    teachersOptions(){
        const query = `SELECT teachers.name, teachers.id
                       FROM teachers
                       `
        
        return db.query(query)
    },

    findBy(filter){
        const query = `SELECT * FROM students
                       WHERE name ILIKE '%${filter}%'
                       `
        return db.query(query)
    }
}