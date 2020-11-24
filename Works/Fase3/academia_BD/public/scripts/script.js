
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

// Paginação
// total_pages = 20 
// selected_Pages = 15
// Como deve aparecer no front- end as páginas:
// [1, ..., 13, 14, 15, 16, 17, ... 20]
// pois não deve aparecer todas as páginas de uma vez, já que fica inviável
// mostrar algo como todas 200 páginas

let totalPages = 20,
    selectedPage = 15.
    pages = []

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage =  currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2


        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            pages.push(currentPage)
        }
    }

    console.log(pages);


