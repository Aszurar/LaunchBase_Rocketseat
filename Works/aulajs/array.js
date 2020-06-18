//Array

const alunos = [
    {
        nome: 'Lucas',
        nota: 9.8
    },

    {
        nome: 'Matheus',
        nota: 10.0
    },
    {
        nome: 'João',
        nota: 8.2
    }
]

const media = (alunos[0].nota + alunos[1].nota + alunos[2].nota)/3;

console.log(`Nomes dos alunos: ${alunos[0].nome}, ${alunos[1].nome} e ${alunos[2].nome}`);
console.log(`Notas dos alunos: ${alunos[0].nota}, ${alunos[1].nota} e ${alunos[2].nota}`);
console.log(`Média dos alunos: ${media.toFixed(2)}`);