
  # Querys Básicas:

   - Criação de uma Base de dados:
```sql
  $ CREATE DATABASE nome_do_banco_de_dados
```
- Criação de tabelas(Entidades):
    ```sql
   CREATE TABLE nome_da_tabela(
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
    3. Definiu a sequence como valor padrão(defalult value) do campo id utilizando a função nextval(), que é responsável por obter o próximo valor de uma sequence. 
  * Além disso, o exemplo acima por padrão permite que os campos possam ser valores vazios(NULL). Caso queira que isso seja mudado, temos que adicionar a configuração NOT A NULL:
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
  * Os dados que serão enviados no campo após o VALUES vem com a estrutura, definida após essa inserção, como é dita abaixo:
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
    * Portanto, é necessário que as ordens dos valores correspondam com as ordens dos campos na query de inserção.
    * Por fim, caso quisessemos alterar ou modificar algum dado para assim então salvar no banco de dados, poderiamos aplicar alguma função que criassemos nesse útlimo campo do array values, como fizemos com a função date().iso
- Por fim, para a inserção ocorrer, é necessário que importemos o arquivo db, que contém as credenciais do banco de dados e utilizemos a função de inserção:
   
   
    ```js
      $ db.query(query, values, function(err, results){
          console.log(err)
          console.log(results)
          callback(results.row[0])
      }) 
    ```
 
  * Nessa função, como parâmetros temos:
    * A query: que é a estrutura SQL para inserção no banco de dados explicada anteriormente
    * O array values que contém os dados advindos do req.body(da página de cadastro em si)
    * Uma função callback que passara os parâmetros:
      *  err: Responsável por armazenar algum erro, caso ocorra. 
      * results: É o resultado da inserção no banco de dados, esse resultado contém os novos dados inseridos e outras informações dessa inserção
  * Além disso há os consoles.logs que são opcionais justamente para imprimir os erros ou resultados caso queira.
  * O results.row[0] é somente o novo dado inserido, ele é passado na função callback que retornará esse novo valor inserido lá no arquivo de controles em que é necessário desse novo dado para redirecionar o usuário para a página members/members.id, ou seja, para a página **do** novo membro, novo dado criado, com isso é necessário o id desse novo dado que vem por meio da callback
___
- Buscando dados no banco:
  * Listagem de todos os dados de uma tabela, ou seja, listagem de todas instâncias de uma Entidade:   
    ```js
    all(callback){
      db.query(`SELECT * FROM nome_da_tabela`,function(err, results){
      if(err) throw `Database Error`
      callback(results.row)
     })
    }
    ```
    * O símbolo  * seleciona todos os instrutores da tabela de instrutores no banco de dados
    * Não precisa do campo values, pois não há nenhum placeholder para ser substituído na query em si.
    * Se um erro ocorre, o if é acionado e com a função throw lança o erro na tela junto com a string passada e para o código
    * results.rows representa todos os dados que foram buscados no banco de dados, no caso é um array dos elementos buscandos na tabela. Todos esses dados são passsados na callback pois serão retornados lá no arquivo de controles para ser renderizada a página de listagem com todos esses dados buscados no banco de dados.
    * Essa query é feita dentro dessa função all, pois está modularizada em um arquivo só de querys, em que esses retornaram informações do banco de dados para o módulo de controle, das funções index, post, put e delete.
___
- Buscando somente 1 instância na tabela:
  ```sql
    `
    SELECT * FROM nome_da_tabela WHERE id = 1
    `
  ou
    `
   SELECT * FROM nome_da_tabela WHERE name = 
   Lucas
    `
  ou
    `
   SELECT * FROM nome_da_tabela WHERE idade = 22
    `
  ```
  * Nesse caso, estamos primeiro selecionando todos os dados da tabela e depois filtrando esses dados ou pelo id, ou pelo nome, ou pela idade. Ou seja, podemos selecionar todos os dados e filtrar aqueles que queremos por meio dos atributos/propriedades dos instâncias.

___

- Atualizando 1 instância específica na tabela:
  ```sql
    `
    UPDATE nome_da_tabela SET
      name = ($1),
      avatar_url = ($2),
      email = ($3),
      gender = ($4),
      birth = ($5),
      blood = ($6),
      weight = ($7),
      height = ($8)
    WHERE id = $9
    `
  ```
   * Após isso, segue a mesma lógica de salvar dados na tabela construindo o vetor dos valores(values) e depois o método db.query, com a única diferença que a função callback não retornará nada, não será usado nehum dado que foi inserido para redirecionar a página ou imprimir na página após salvar a atualização.
   
      Não passaremos callback com o id do dado atual para redirecionar a página, pois o id que será passado pela URL(params) para o redirect direto no arquivo de controles, então
      basta salvar os novos dados normalmente.
___
- Deletando dados(1 instância da tabela) da tabela:
  ```sql
  delete(id, callback){
     db.query(`DELETE FROM nome_da_tabela WHERE id = $1`, [id], function(err, results){
       if(err) throw `Database erro! ${err}`
    
      })
    }
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
