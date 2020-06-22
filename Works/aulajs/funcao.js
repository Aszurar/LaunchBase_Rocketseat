//utilizando funções!
function mediaTurmas(alunos){
    return  media = (alunos[0].nota + alunos[1].nota + alunos[2].nota)/3;
}

function avalicao(media , turma){
    if (media > 5) {
        console.log(`A média da ${turma} é de ${media.toFixed(2)}, Parabéns!.`);
    } else {
        console.log(`A média da ${turma} foi menor que 5.`);
    }
}

const turmaA = [
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

const turmaB = [
    {
        nome: 'Thiago',
        nota: 5.6
    },

    {
        nome: 'Bruno',
        nota: 2.8
    },

    {
        nome: 'Felipe',
        nota: 2.6
    }
]

const media1 = mediaTurmas(turmaA);
const media2 = mediaTurmas(turmaB);

console.log(`Nomes da Turma A: ${turmaA[0].nome}, ${turmaA[1].nome} e ${turmaA[2].nome}`);
console.log(`Nomes da Turma B: ${turmaB[0].nome}, ${turmaB[1].nome} e ${turmaB[2].nome}`);
avalicao(media1, 'turma A');
avalicao(media2, 'turma B');


