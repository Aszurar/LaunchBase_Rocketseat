
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

function paginate(selectedPage, totalPages){
    let pages = [],
        oldPage

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            
            const firstAndLastPage = currentPage == 1 || currentPage == totalPages
            const pagesAfterSelectedPage =  currentPage <= selectedPage + 2
            const pagesBeforeSelectedPage = currentPage >= selectedPage - 2


            if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
                // Lógica dos "..." na paginação
                // se a diferença da pagina anterior com a página atual for maior que 2
                // então adicione o "..."  após o pagesAfterSelected
                if (oldPage && currentPage - oldPage > 2) {
                    pages.push("...")
                }
                // Caso seja igual a 2, então mostre o número anterior ao último elemento
                if(oldPage && currentPage - oldPage == 2){
                    pages.push(oldPage + 1)
                }

                pages.push(currentPage)

                oldPage = currentPage
            }
        }
        return pages
}
const pagination = document.querySelector(".pagination")

function createPagination(pagination){
    // pegando os dados de quantidade de páginas e da página atual do back-end
    // e apresentando na tela(front-end)
    const page = Number(pagination.dataset.page)
    const total = Number(pagination.dataset.total)
    const filter = pagination.dataset.filter
    const pages = paginate(page, total)
    
    
    let elements = ""
    
    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
    
            if ( filter ) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`    
            } else{
                elements += `<a href="?page=${page}">${page}</a>`    
            }
        }
    }
    // console.log(pagination.innerHTML);
    // console.log(elements);
    pagination.innerHTML = elements
    // console.log(pagination.innerHTML);
}

if (pagination) {
    createPagination(paginate)
}
