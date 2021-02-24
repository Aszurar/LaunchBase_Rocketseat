const db = require('../../config/db')

module.exports = {
    all() {
        // essas db.query já são promises
        return db.query(
            `SELECT * FROM categories`
        )
    }
}