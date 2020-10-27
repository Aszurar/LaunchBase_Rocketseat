
// Acessando a página atual no navegador e pegando seu caminho na URL(/members ou /instructor) 
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

console.log(currentPage);

menuItems.forEach(item => {
    // includes é uma função que verifica se na string aplicada há a string passada, 
    // caso tenha ele irá retornar verdadeiro, se não, vai retornar falso
    // Então aqui é, se no caminho atual tiver members ou instructor, 
    // irá retornar verdadeiro, se não retorna falso
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }    
});

