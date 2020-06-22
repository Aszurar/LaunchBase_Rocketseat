//Cálculo de IMC
const nome = 'Carlos';
const peso = 100;
const altura = 1.70;
const sexo = 'masculino';
const imc = peso/(altura * altura);

if(imc >= 30){
    console.log('Carlos você está acima do peso.');
}else {
    console.log('Carlos você não está acima do peso.');
}
//-----------------------------------------------------------
/*
//Cálculo de aposentadoria
const nome = 'Silvana';
const sexo = 'F';
const idade ='55';
const contribuicao = '30';
const regra = idade + contribuicao;

 //1º Versão que pensei
if(sexo === 'M' && contribuicao >= 35 && regra >= 95){
    console.log(`${nome}, você pode se aposentar.`);

}else if(sexo === 'F' && contribuicao >= 30 && regra >= 85){
    console.log(`${nome}, você pode se aposentar.`);
}else{
    console.log(`${nome}, você ainda não pode se aposentar.`);
}

//2º Versão que pensei
if((sexo === 'M' && contribuicao >= 35 && regra >= 95) || (sexo === 'F' && contribuicao >= 30 && regra >= 85)){
    console.log(`${nome}, você pode se aposentar.`);
}else{
    console.log(`${nome}, você ainda não pode se aposentar.`);
}
*/