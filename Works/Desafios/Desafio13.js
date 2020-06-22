//Usuários e tecnologias
//entrar no array de objetos e checar o array de tecnologias
// function checagemGeral(usuarios) {
    
//     usuarios.forEach(sorvete => {
//         //console.log(`${sorvete.nome} trabalha com ${sorvete.tecnologias}`);
        
//         sorvete.tecnologias.forEach(napolitano => {
//             if(napolitano == 'CSS'){
//                //console.log(true);
//                console.log(`${sorvete.nome} trabalha com ${napolitano}`);   
//             }
//         });
//     });

// }

// function checaSeUsuarioUsaCSS(usuario){
//     for(let i = 0; i < usuario.tecnologias.length; i++){
//         if(usuario.tecnologias[i] == 'CSS'){
//             //console.log(true);
//             console.log(usuario.tecnologias[i]);//testando
//             return true;
//         }else {
//             console.log(usuario.tecnologias[i]);//testando
//             //console.log(false);
//             return false;

//         }
//     }
// }

// function usuarioCSS(usuarios){
//     for(let j = 0; j < usuarios.length; j++){
//         let usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[j]);
//         console.log(usuarioTrabalhaComCSS);//testando

//         if(usuarioTrabalhaComCSS){
//             console.log(`${usuarios[j].nome} trabalha com CSS`);
//         }
//     }
// }

// const usuarios = [
//     { nome: 'Carlos', tecnologias: ['HTML', 'CSS', 'SORVETE']},
//     { nome: 'Jasmine', tecnologias: ['JavaScript', 'CSS'] },
//     { nome: 'Tuane', tecnologias: ['HTML', 'Node.js'] }
// ]

// usuarioCSS(usuarios);
// // let teste = []
// //checagemGeral(usuarios);
// //console.log(teste);
// // checagemGeral(usuarios);
//==================================================================================================================================
//Soma de despesas

function somaNumeros(lista){
    let i = 0, j = 0;
    let soma = 0;
    let adicao = 0;
    while(i < lista.receitas.length){
        soma = soma + lista.receitas[i];
        i++;
    }
    while(j < lista.despesas.length){
        adicao = adicao + lista.despesas[j];
        j++;
    }
    return (soma - adicao);
}

function CalculaSaldo(usuario){
    usuario.forEach(elemento => {
        saldo = somaNumeros(elemento);
        //console.log(receitaTotal);
        if(saldo >= 0){
            console.log(`${elemento.nome} possui saldo POSITIVO de ${saldo.toFixed(2)}`);
        }else{
            console.log(`${elemento.nome} possui saldo NEGATIVO de ${saldo.toFixed(2)}`);
        }
    });
}


const clientes = [
    {
      nome: "Salvio",
      receitas: [115.3, 48.7, 98.3, 14.5],
      despesas: [85.3, 13.5, 19.9]
    },

    {
      nome: "Marcio",
      receitas: [24.6, 214.3, 45.3],
      despesas: [185.3, 12.1, 120.0]
    },

    {
      nome: "Lucia",
      receitas: [9.8, 120.3, 340.2, 45.3],
      despesas: [450.2, 29.9]
    }
  ];

  CalculaSaldo(clientes);