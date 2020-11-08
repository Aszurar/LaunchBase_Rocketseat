
  # Querys Básicas:

   - Criação de uma Base de dados:
```bash
  $ CREATE DATABASE nome_do_banco_de_dados
```
- Criação de tabelas(Entidades):
    ```bash
  $ CREATE TABLE nome_da_tabela(
      id SERIAL PRIMARY KEY,
      name TEXT,
      avatar_url TEXT,
      email TEXT,
      gender TEXT,
      birth TIMESTAMP,
      blood TEXT,
      weight INTEGER,
      height INTEGER,
  )
    ```
  * Nesse caso acima, o tipo "serial" já é um tipo que configura o dado (id) como inteiro e com incremento automático pelo banco de dados. No PostgreSQL é dito que esse tipo executa 3 configurações de uma vez:
    1. Cria um campo ID com o tipo integer
    2. Cria uma sequence, recurso do PostgreSQL para gerar números sequencias
    3. Definiou a sequence como valor padrão(defalult value) do campo utilizando a função nextval(), que é responsável por obter o próximo valor de uma sequence. 
  * Além disso, acima por padrão permite que os campos possam ser valores vazios(NULL). Caso queira que isso seja mudado, temos que adicionar a configuração NOT A NULL:
    ```bash
    $ CREATE TABLE nome_da_tabela(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        avatar_url TEXT NOT NULL,
    )
    ```
___
- Inserção no Banco de dados:
    ```js
  $ const query = `
  INSERT TO nome_da_tabela(
    name,
    avatar_url,
    email,
    gender,
    birth,
    blood,
    weight,
    height
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING id
  `
    ```
  * É necessário que tudo esteja escrito corretamente, conforme os campos definidos na tabela.
  * Além disso, após o values, é o campo em que os valores serão inseridos, e cada número corresponde à um campo da tabela, na ordem posta pelos campos escritos acima.
  * Ou seja, name equivale ao $1, avatar_url equivalo ao $2, email equivale ao $3.
  * Os dados que serão enviados no campo após o VALUES vem com a estrutura que definida após essa inserção, como é dita abaixo:
     ```js
    $ const values = [
        req.body.name,
        req.body.avatar_url,
        req.body.email,
        req.body.gender,
        date(req.body.birth).iso,
        req.body.blood,
        req.body.weight,
        req.body.height
    ]
     ```
    * req.body.name é o valor inserido no $1, req.body.avatar_url é o valor inserido no $2, req.body.email é o valor inserido no $3 e assim sucessivamente.   
    * Portando, é necessário que as ordens dos valores correspondam com as ordens dos campos na query de inserção.
    * Por fim, caso quisessemos alterar, modificar algum dado para assim então salvar no banco de dados, podemos aplicar alguma função que criamos nesse útlimo campo do array valeus, como fizemos com a função date().iso
- Por fim, para a inserção ocorrer, é necessário que importemos o arquivo db, que contém as credenciais do banco de dados e utilizemos a função de inserção:
   
    ```js
  $ db.query(query, values, function(err, results){
      console.log(err)
      console.log(results)
      callback(results.row)
  }) 
    ```
 
  * Nessa função, como parâmetros temos:
    * A query: que é a estrutura SQL para inserção no banco de dados explicada anteriormente
    * O array values que contém os dados advindos do req.body(da página de cadastro em si)
    * Uma função callback que passara os parâmetros:
      *  err: Responsável por armazenar algum erro, caso ocorra. 
      * results: É o resultado da inserção no banco de dados, esse resultado contém os novos dados inseridos e outras informações dessa inserção
  * Além disso há os consoles,logs que são opcionais justamente para imprimir os erros ou resultados caso queira.
  * O results.row é o novo dado inserido, ele é passado na função callback 
___
- Buscando dados no banco:
  * Listagem de todos os dados de uma tabela, ou seja, listagem de todas instâncias de uma Entidade:   
    ```js
  db.query(`SELECT * FROM nome_da_tabela`, function(err, results){
      if(err) throw `Database Error`
  })
    ```
  * O símboldo  * seleciona todos os instrutores da tabela de instrutores no banco de dados
  * Não precisa do campo values, pois não há nenhum placeholder para ser substituído na query em si.
  * Se um erro ocorre, o if é acionado e com a função throw lança o erro na tela junto com a string passada e para o código
- Instalar o Nunjucks:
```bash
  $ npm install nunjucks
```
 - Instalar o  Browser-sync e npm-run-all:
```bash
  $ npm install browser-sync npm-run-all -D
```
 - Após isso configure o script do arquivo package.json assim:
 ```bash
   "scripts": {
    "start": "npm-run-all -p nodemon browsersync",
    "nodemon": "nodemon server.js",
    "browsersync": "browser-sync start --proxy http://localhost:5001 --files 'public,views'"
  },
```
 - Execução:
 ```bash
  $ npm start
```
- A utilização do browser-sync e npm-run-all basicamente serve para que o site seja aberto automaticamente assim que executamos o projeto, que a página na web se atualize cada veze que realizarmos alguma mudança no projeto, ou seja, a sincronia estea totalmente automática, facilitando o desenvolvimento.
- As configurações no serve.js já estão feitas para utilizarem essas ferramentas.
```json
{   
    "ignore": ["*.json"] 
}
```
- Isso previne o projeto de ficar em loop de carregamento "infinito" no navegador quando uma mudança for feita no arquivo json de dados.
___
Desenvolvido por :star2: Lucas de Lima Martins de Souza.
