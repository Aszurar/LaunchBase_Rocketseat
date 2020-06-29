//Cálculo de IMC
// const name = 'Carlos';
// const weight = 70;
// const height = 1.70;
// const gender = 'male';
// const imc = weight/(height * height);

// if(imc >= 30){
//     console.log('Carlos você está acima do peso.');
// }else {
//     console.log(`Carlos você não está acima do peso.`);
// }
//-----------------------------------------------------------

//Cálculo de aposentadoria
const name = 'Silvana';
const gender = 'F';
const age ='55';
const contribution = '30';
const rule = age + contribution;

 //1º Versão que pensei
// if(gender === 'M' && contribution >= 35 && rule >= 95){
//     console.log(`${name}, você pode se aposentar.`);

// }else if(gender === 'F' && contribution >= 30 && rule >= 85){
//     console.log(`${name}, você pode se aposentar.`);
// }else{
//     console.log(`${name}, você ainda não pode se aposentar.`);
// }

//2º Versão que pensei
if((gender === 'M' && contribution >= 35 && rule >= 95) || (gender === 'F' && contribution >= 30 && rule >= 85)){
    console.log(`${name}, você pode se aposentar.`);
}else{
    console.log(`${name}, você ainda não pode se aposentar.`);
}
