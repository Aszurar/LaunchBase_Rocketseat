function addIngredient() {
    // Campos Dinâmicos
    const ingredients = document.querySelector("#ingredients")
    const fieldIngredient = document.querySelectorAll(".ingredient")

    // Clonando o último ingrediente adicionado
    const newField = fieldIngredient[fieldIngredient.length - 1].cloneNode(true);

    // verificando se ele está vazio, se estiver retornará falso e não irá adicionar um novo campo para o usuário
    if(newField.children[0].value == "") return false;

    // apagando o conteúdo do novo campo para mostra ao usuário "limpo"
    newField.children[0].value = ""
    // adicionando o novo campo para a estrutura "pai" do input
    ingredients.appendChild(newField);
}

document.querySelector(".add-ingredient").addEventListener("click", addIngredient)