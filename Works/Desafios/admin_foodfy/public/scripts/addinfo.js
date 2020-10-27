function addField(structure, input) {
    // Campos Dinâmicos
    
    // Clonando o último ingrediente adicionado
    const newField = input[input.length - 1].cloneNode(true);

    // verificando se ele está vazio, se estiver retornará falso e não irá adicionar um novo campo para o usuário
    if(newField.children[0].value == "") return false;

    // apagando o conteúdo do novo campo para mostra ao usuário "limpo"
    newField.children[0].value = ""
    // adicionando o novo campo para a estrutura "pai" do input
    structure.appendChild(newField);
}

const ingredients = document.querySelector("#ingredients")
const fieldIngredient = document.querySelectorAll(".ingredient")

const preparations = document.querySelector("#preparations") 
const fieldPreparation = document.querySelectorAll(".preparation")

document.querySelector(".add-ingredient").addEventListener("click", function(){addField(ingredients, fieldIngredient)})
document.querySelector(".add-preparation").addEventListener("click", function(){addField(preparations, fieldPreparation)})