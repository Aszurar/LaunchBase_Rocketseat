// Desestrutura-se o objeto Pool do PG para que seja feita configurações
// a fim de evitar a sempre validação do usuário para mexer no banco
// de dados
// Ou seja, sem essas configurações a baixo, toda vez que for
// mexer no bd seria necessário validar a identificação do 
// usuário
const { Pool } = require("pg")

// credenciais necessarias para acessar o bd e executar as querys
module.exports = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})
