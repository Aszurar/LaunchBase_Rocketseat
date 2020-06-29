// Construção e impressão de objetos
// const companies = [

//     {
//         name: 'Rocketseat',
//         color: 'roxo',
//         focus: 'Programação',
//         address: {
//             street: 'Guilherme Gembala',
//             number: 260
//         }
//     },

//     {
//         name: 'Sorveteiros',
//         color: 'morango',
//         focus: 'sorvete',
//         address: {
//             street: 'Agente Fiscalizador de Sorvetes',
//             number: 333
//         }
//     },
    
//     {
//         name: 'SushiSÃO',
//         color: 'shoyu',
//         focus: 'sushi',
//         address: {
//             street: 'Cedro de Sushi Apimentado',
//             number: 76
//         }
//     }, 

//     {
//         name: 'Padaria20',
//         color: 'laranja',
//         focus: 'massas',
//         address: {
//             street: 'Guilherme Alves',
//             number: 23
//         }
//     }
// ]

// companies.forEach(company => {
//     console.log(`A empresa ${company.name} está localizada na rua ${company.address.street}, ${company.address.number}`);

// });
   
//====================================================================================================================================

//Vetores e objetos
const programmers = [
    {
        name: 'Lucas',
        age: 22,
        technologies: [
            {name: 'C', specialty: 'Desktop'},
            {name: 'C++', specialty: 'Desktop'},
            {name: 'Python', specialty: 'Desktop'},
            {name: 'javascript', specialty: 'Desktop'},
            {name: 'HTML5 & CSS', specialty: 'Desktop'}
        ]
    },
    
    {
        name: 'Jose',
        age: 21,
        technologies: [
            {name: 'C', specialty: 'Desktop'},
            {name: 'Python', specialty: 'Desktop'}
        ]
    },

    {
        name: 'Thiago',
        age: 20,
        technologies: [
            {name: 'C++', specialty: 'Desktop'},
            {name: 'JAVA', specialty: 'Desktop'},
            {name: 'Python', specialty: 'Desktop'}
        ]
    },

    {
        name: 'Carlos',
        age: 32,
        technologies: [
            {name: 'JAVA', specialty: 'Desktop'},
            {name: 'Python', specialty: 'Desktop'}
        ]
    }

] 

programmers.forEach(programmer => {
    console.log(`O usuário ${programmer.name} tem ${programmer.age} anos e usa a tecnologia ${programmer.technologies[0].name} com especialidade ${programmer.technologies[0].specialty}`);
});
