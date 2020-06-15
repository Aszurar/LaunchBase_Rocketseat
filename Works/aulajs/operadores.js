/*============================================
    OPERADORES DE COMPARAÇÃO

    >               MAIOR
    <               MENOR
    >=              MAIOR OU IGUAL A
    <=              MENOR OU IGUAL A
    ==              IGUAL A
    ===             IGUAL E DO MESMO TIPO
    !=              DIFERENTE DE
    !==             DIFERENTE, INCLUINDO O TIPO

ex:
4 =='4' - true
4 === '4' - false
4 != '5' - true
4 !== '5' = true
===============================================*/

const idade = 20

/*//Minha versão
if(idade >= 18){
    console.log('Entrada permitida.');
}else if(idade === 17){
    console.log('Volte quando fizer 18 anos!.');
} else{
    console.log('Entrada Bloqueada!.');
}

/Versão do professor:
if(idade >= 18){
    console.log('Entrada permitida.');
} else{
    console.log('Entrada Bloqueada!.');
}
if(idade == 18){
    console.log('VOlte quando fizer 18 anos!');
}*/

//otimizando os códigos acima
if(!(idade >=18) || (idade === 17)){
    console.log('Entrada bloqueada!');
}else{
    console.log('Entrada Permitida!.');
}
