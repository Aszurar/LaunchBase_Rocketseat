//Usuários e technologies
// const users = [
//     { name: 'Carlos', technologies: ['HTML', 'CSS', 'SORVETE'] },
//     { name: 'Jasmine', technologies: ['JavaScript', 'CSS'] },
//     { name: 'Tuane', technologies: ['HTML', 'Node.js'] }
// ]

// function generalCheck(users) {
//     users.forEach(user => {
//         console.log(`${user.name} trabalha com ${user.technologies.join(", ")}`);
//        user.technologies.forEach(technology => {
//             if (technology == 'CSS') {
//                 console.log(`${user.name} trabalha com ${technology}`);
//             }
    //   });
//      });

// }

// function checaSeUsuarioUsaCSS(user) {
//     let returnCatch = false;

//     for (let i = 0; i < user.technologies.length; i++) {
//         if (user.technologies[i] == 'CSS') {
//             returnCatch = true;
//         }

//     }
//     return returnCatch;

// }

// for (let j = 0; j < users.length; j++) {
//     let userTrabalhaComCSS = checaSeUsuarioUsaCSS(users[j]);

//     if (userTrabalhaComCSS) {
//         console.log(`${users[j].name} trabalha com CSS`);
//     }
// }


// generalCheck(users);
//==================================================================================================================================
// Soma de despesa
const clients = [
    {
        name: "Silvio",
        revenues: [115.3, 48.7, 98.3, 14.5],
        expenses: [85.3, 13.5, 19.9]
    },
    // 
    {
        name: "Marcio",
        revenues: [24.6, 214.3, 45.3],
        expenses: [185.3, 12.1, 120.0]
    },
    // 
    {
        name: "Lucia",
        revenues: [9.8, 120.3, 340.2, 45.3],
        expenses: [450.2, 29.9]
    }
];

function numbersSum(list) {
    let i = 0, j = 0;
    let sum = 0;
    let addSum = 0;

    while (i < list.revenues.length) {
        sum += list.revenues[i];
        i++;
    }
    while (j < list.expenses.length) {
        addSum += list.expenses[j];
        j++;
    }
 
    return (sum - addSum);
}
 
function balanceCalculate(user) {
    user.forEach(element => {
        let balance = numbersSum(element);
        if (balance >= 0) {
            console.log(`${element.name} possui saldo POSITIVO de ${balance.toFixed(2)}`);
        } else {
            console.log(`${element.name} possui saldo NEGATIVO de ${balance.toFixed(2)}`);
        }
    });
}
 
balanceCalculate(clients);