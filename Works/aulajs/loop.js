//utilizando funções!
function mediaTurmas(alunos){
    let soma = 0;
    let i = 0;
    
    while(i < alunos.length){
      soma = soma + alunos[i].nota;
     i++;
    }
    const media = (soma/alunos.length);
    
    return media;
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
    },
    {
        nome: 'Sebastião',
        nota: 10
    }
]

const turmaB = [
    {
        nome: 'Thiago',
        nota: 5.6
    },

    {
        nome: 'Bruno',
        nota: 9.8
    },

    {
        nome: 'Felipe',
        nota: 2.6
    },

    {
        nome: 'Luciano',
        nota: 8.4
    }
]

media1 = mediaTurmas(turmaA);
media2 = mediaTurmas(turmaB);

avalicao(media1, 'turma A');
avalicao(media2, 'turma B');


