const { age, date, service } = require('../../lib/tools');
const { db } = require('../../config/db')

module.exports = {
    
    index(req, res){
         return res.render("instructors/index");
    },
    
    create(req, res){
        return res.render("instructors/create");
    },
    
    post(req, res){
        
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }

        });
        
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
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
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
        })

        return
    },

    show(req, res){
       return
        
    },

    edit(req, res){

        return
        
    },

    put(req, res){
                
        const keys = Object.keys(req.body);

        keys.forEach(key => {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }

        });

        return
        
    },

    delete(req, res){
        return
        
    }
}



