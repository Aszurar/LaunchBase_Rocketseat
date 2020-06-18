const empresas = [

    {
        nome: 'Rocketseat',
        cor: 'roxo',
        foco: 'Programação',
        endereco: {
            rua: 'Guilherme Gembala',
            numero: 260
        }
    },

    {
        nome: 'Sorveteiros',
        cor: 'morango',
        foco: 'sorvete',
        endereco: {
            rua: 'Agente Fiscalizador de Sorvetes',
            numero: 333
        }
    },
    
    {
        nome: 'SushiSÃO',
        cor: 'shoyu',
        foco: 'sushi',
        endereco: {
            rua: 'Cedro de Sushi Apimentado',
            numero: 76
        }
    }
]

i = 0;
while(i < 3){
    console.log(`A empresa ${empresas[i].nome} está localizada na rua ${empresas[i].endereco.rua}, ${empresas[i].endereco.numero}`);
    i++;
}
//====================================================================================================================================

const programadores = [
    {
        nome: 'Lucas',
        idade: 22,
        tecnologias: [
            {nome: 'C', especialidade: 'Desktop'},
            {nome: 'C++', especialidade: 'Desktop'},
            {nome: 'Python', especialidade: 'Desktop'},
            {nome: 'javascript', especialidade: 'Desktop'},
            {nome: 'HTML5 & CSS', especialidade: 'Desktop'}
        ]
    },
    
    {
        nome: 'Jose',
        idade: 21,
        tecnologias: [
            {nome: 'C', especialidade: 'Desktop'},
            {nome: 'Python', especialidade: 'Desktop'},
        ]
    },

    {
        nome: 'Thiago',
        idade: 20,
        tecnologias: [
            {nome: 'C++', especialidade: 'Desktop'},
            {nome: 'JAVA', especialidade: 'Desktop'},
            {nome: 'Python', especialidade: 'Desktop'}
        ]
    }
] //O usuário Carlos tem 32 anos e usa a tecnologia C++ com especialidade em Desktop

j = 0;
while(j < 3){
    console.log(`O usuário ${programadores[j].nome} tem ${programadores[j].idade} anos e usa a tecnologia ${programadores[j].tecnologias[0].nome} com especialidade ${programadores[j].tecnologias[0].especialidade}`);
    j++;
}