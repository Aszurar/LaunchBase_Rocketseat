
const Mask = {
    apply(input, func){
        // Função que executa outra função após uma quantidade de microsegundos dado no 2º parâmetro
        setTimeout(() =>{
            // Chamando a função especificada no parâmetro do apply e passando o parâmetro da propriedade 
            // value do input para atribuir ao mesmo value a formatação desejada
            input.value = Mask[func](input.value)
        }, 1)
    },

    formatBRL(value){
        // Removendo tudo que não for dígito
        value = value.replace(/\D/g, "")

        // formatação do texto em notação de moeda brasileira: R$ 00,00
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value/100)
                // É necessário dividir por 100 pois quando o valor na próxima vez que um valor é digitado.
        // o replace vai remover tudo que não for caracter e transformar número de forma que ocorra o seguinte:
        // 1º vez: 1 -> R$ 1,00
        // 2º vez: 1 -> 100 + 1(concatenação) > R$ 1001,00
        // Logo é sempre necessário dividir por 100 para que o valor digitado sempre fique na casa decimal
        // apropriada
    },
}

const Activates = {
    deleteAlert(deleteForm){
        const confirmation = confirm("Tem certeza que quer deletar?")
        
        if(!confirmation){
           event.preventDefault()
        }
    },

    labelToggle(input) {
        const onLabel = document.getElementById('status-on')
        const offLabel = document.getElementById('status-off')
    
        
        if (input.value == 1) {
            onLabel.classList.add("activate")
            offLabel.classList.remove("activate")
        } else {
            offLabel.classList.add("activate")
            onLabel.classList.remove("activate")
        }

        console.log(input.value);
        console.log(input.getAttributeNames().includes('checked'));
    
        // ativar os CSS na página de edição
    
    }, 
    label() {
        const onInput = document.querySelector('#status-on input')
        const offInput = document.querySelector('#status-off input')
        const onLabel = document.getElementById('status-on')
        const offLabel = document.getElementById('status-off')

        if (onInput.checked) {
            console.log(`Input do sim: ${onInput.checked}`);
            onLabel.classList.add('activate')
        } else if (offInput.checked){
            console.log(`Input do Não: ${offInput.checked}`);
            offLabel.classList.add('activate')
        }

    }
}

Activates.label()

// const formDelete = document.querySelector("#form-delete")

// formDelete.addEventListener("submit", function(event){

//     if(!confirmation){
//         event.preventDefault()
//     }
// })