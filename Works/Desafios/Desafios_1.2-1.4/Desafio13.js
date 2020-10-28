// Usuários e technologies
const users = [
    { name: 'Carlos', technologies: ['HTML', 'CSS'] },
    { name: 'Jasmine', technologies: ['JavaScript', 'CSS'] },
    { name: 'Tuane', technologies: ['HTML', 'Node.js'] },
    { name: 'Julia', technologies: ['HTML', 'Node.js', 'Python', 'C'] }

]

function generalCheck(users) {
    users.forEach(user => {
        const arraysize = user.technologies.length
        const lastelement = user.technologies.length -1
        const penultelement = user.technologies.length - 2
        
        // se a quantidade de tecnologias for 2 então basta colocar o e como separador entre cada 
        // elemento
        if (arraysize <= 2) {
            console.log(`${user.name} trabalha com ${user.technologies.join(" e ")}`);

            // Se não faça o seguinte tratamento:
        } else{
            // Armazeno todos os elementos do array antes do último elemento em um novo array 
            initialString = user.technologies.slice(0, lastelement)
            
            // pego o último elemento desse array
            lastechnologie = user.technologies.slice(lastelement, arraysize)

            // transformo tudo para string e realizo uma concatenação de string dos primeiros elementos do array com o ' e '
            // entre eles e o último elemento formando a frase completa.
            finalString = initialString.join(", ") + ' e ' + lastechnologie.toString()

            console.log(`${user.name} trabalha com ${finalString}`);
        }
            // user.technologies.forEach(technology => {
            // if (technology == 'CSS') {
                // console.log(`${user.name} trabalha com ${technology}`);
            // }
        // } );
    });
}

// //1º método pensado
// function checaSeUsuarioUsaCSS2(user) {
//     let returnCatch = false;

//     for (let i = 0; i < user.technologies.length; i++) {
//         if (user.technologies[i] == 'CSS') {
//             returnCatch = true;
//         }

//     }
//     return returnCatch;

// }
// //2º método pensado
// function checaSeUsuarioUsaCSS(user) {
//     for (let technology of user.technologies) {
//         if (technology === 'CSS') {
//             return true;
//         }
//     }
//     return false;
// }

// for (let j = 0; j < users.length; j++) {
//     let userTrabalhaComCSS = checaSeUsuarioUsaCSS(users[j]);

//     if (userTrabalhaComCSS) {
//         console.log(`${users[j].name} trabalha com CSS`);
//     }
// }


generalCheck(users);
//==================================================================================================================================
// Soma de despesa
// const clients = [
//     {
//         name: "Silvio",
//         revenues: [115.3, 48.7, 98.3, 14.5],
//         expenses: [85.3, 13.5, 19.9]
//     },
//     // 
//     {
//         name: "Marcio",
//         revenues: [24.6, 214.3, 45.3],
//         expenses: [185.3, 12.1, 120.0]
//     },
//     // 
//     {
//         name: "Lucia",
//         revenues: [9.8, 120.3, 340.2, 45.3],
//         expenses: [450.2, 29.9]
//     }
// ];

//1º FORMA QUE PENSEI EM FAZER!
// function numbersSum(list) {
//     let i = 0, j = 0;
//     let sum = 0;
//     let addSum = 0;

//     while (i < list.revenues.length) {
//         sum += list.revenues[i];
//         i++;
//     }
//     while (j < list.expenses.length) {
//         addSum += list.expenses[j];
//         j++;
//     }

//     return (sum - addSum);
// }

// function balanceCalculate(user) {
//     user.forEach(element => {
//         let balance = numbersSum(element);
//         if (balance >= 0) {
//             console.log(`${element.name} possui saldo POSITIVO de ${balance.toFixed(2)}`);
//         } else {
//             console.log(`${element.name} possui saldo NEGATIVO de ${balance.toFixed(2)}`);
//         }
//     });
// }

// balanceCalculate(clients);

// 2º FORMA INDICADA PELA QUESTÃO
// function numbersSum2(numbers) {
//     let sum = 0;
//     for(let number of numbers){
//         sum += number;
//     }
//     return sum;
// }

// function balanceCalculate2 (revenues, expenses) {
//     const totalRevenues = numbersSum2(revenues);
//     const totalexpenses = numbersSum2(expenses);

//     return (totalRevenues - totalexpenses);
// }

// for(let client of clients){
//     let balance = balanceCalculate2(client.revenues, client.expenses);
    
//     if(balance >= 0){
//         console.log(`${client.name} possui o saldo POSITIVO de ${balance.toFixed(2)}`);
//     }else{
//         console.log(`${client.name} possui o saldo NEGATIVO de ${balance.toFixed(2)}`);
//     }
// }