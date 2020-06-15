//variáveis e strings
const nome = 'Lucas de Lima';
const nome2 = "Matheus";
const nome3 = `Lucas e ${nome2}`; //tamplate string, forma mais atual de se usar strings

console.log(nome);
console.log(nome2);
console.log(nome3);

const aluno01 = 'Lucas';
const notaAluno01 = 1.8;

const aluno02 = 'Matheus';
const notaAluno02 = 10;

const aluno03 = 'Diego';
const notaAluno03 = 2;

const media = (notaAluno01 + notaAluno02 + notaAluno03) / 3;
//se a média é maior que 5 faça algo
if (media > 5) {
    console.log(`A média é de ${media}, Parabéns!.`);
} else {
    console.log('A média foi menor que 5.');
}