<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>
<h1 align="center">
    Minhas práticas nos desafios do LaunchBase da Rocketseat!.
</h1>

<h3 align="center">
  Desafio 1-1: Primeiros passos com JS
</h3>

<blockquote align="center">“Querer vencer significa já ter percorrido metade do caminho.”</blockquote>

<p align="center">

  <a href="https://www.linkedin.com/in/lucas-de-lima-azsura/">  
  </a>
</p>

## Sobre o desafio

Desafios para fortalecer alguns conceitos, entre eles:

- **Variáveis**;
- **Condicionais**;
- **Operadores**.

### Cálculo de IMC

Crie um programa para calcular o IMC e nível de obesidade de uma pessoa:

Comecei criando constantes para armazenar o `nome`, `peso`, `altura` e `sexo` de uma pessoa, por exemplo:

```js
const nome = "Maria";
const peso = 65;
const altura = 1.70;
const sexo = 'feminino'
```

A partir desses dados armazenei em uma constante chamada `imc` o cálculo do índice de massa corporal definido pela fórmula abaixo:

```js
peso / (altura * altura);
```

Baseado no valor obtido através desse cálculo seiga a seguinte lógica:

- **Se** o IMC **maior ou igual** a 30: `Maria você está acima do peso`;
- **Senão**: `Maria você não está acima do peso`;

### Cálculo de aposentadoria

Crie um programa para calcular a aposentadoria de uma pessoa:(Lógica de calculo da aposentadoria fictícia/simplista, só para exercicitar)

Comece criando constantes para armazenar `nome`, `sexo`, `idade` e `contribuicao`(em anos), por exemplo:

```js
const nome = "Marcos";
const sexo = "M";
const idade = 72;
const contribuicao = 35;
```

Baseado nos valores acima utilize as fórmulas a seguir para calcular se a pessoa está apta ou não para se aposentar e no fim imprima uma mensagem em tela.

- O tempo de contribuição mínimo para **homens** é de **35 anos** e, para **mulheres**, **30 anos**;
- Utilizando a regra 85-95, a soma da idade com o tempo de contribuição do **homem** precisa ser de no mínimo 95 anos, enquanto a **mulher** precisa ter no mínimo 85 anos na soma;

Com base nas regras acima imprima na tela as mensagens:

- **Se** a pessoa estiver aposentada: `Marcos, você pode se aposentar!`;
- **Se** a pessoa **NÃO** estiver aposentada: `Marcos, você ainda não pode se aposentar!`;

Na minha estrutura de condição utilizei a organização das condições da seguinte forma:
- **(** Se a pessoa for do sexo masculino **E** tiver contribuido com 35 anos ou mais **E** ter o somatório de 95 anos ou mais dos anos de contribuição com a idade **)**  
- **OU** **(** Se a pessoa for do sexo feminino **E** tiver contribuido com 30 anos ou mais **E** ter o somatório de 85 anos ou mais dos anos de contribuição com a idade **)**
- **ENTÃO** 
    `Ela está apta a se aposentar,` 
- **SENÃO**
    `Ela não está apta a se aposentar.` 
