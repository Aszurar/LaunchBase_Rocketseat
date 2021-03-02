
// Acessando a página atual no navegador e pegando seu caminho na URL
const currentPage = location.href;

// função que aplica efeito na navbar e no body
function navbarEffect(currentPage) {
    const menuItems = document.querySelectorAll("header .links a");
    const body = document.querySelector(".body")
    const members = "members"
    
    menuItems.forEach(link => {
        // includes é uma função que verifica se na string aplicada há a string passada, 
        // caso tenha ele irá retornar verdadeiro, se não, vai retornar falso
        // Então aqui é, se no caminho atual tiver members ou instructor, 
        // irá retornar verdadeiro, se não retorna falso
        if (currentPage.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
        if (currentPage.includes(members)) {
            body.classList.add(members);
        }
    });
}

navbarEffect(currentPage)
 
// função que aplica o efeito no número da página quando clicado
function pagesEffect(currentPage){
    const pagesLinks = document.querySelectorAll(".pagination a")
    const shorthref = currentPage.split('page')

    if (shorthref.length == 1) {
        pagesLinks[0].classList.add('active')
    } else {
        pagesLinks.forEach(page => {
            if (shorthref[1].includes(page.innerHTML)) {
                page.classList.toggle('active')
            } 
        })
    }
}

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
            
            const firstAndLastPage = currentPage == 1 || currentPage == totalPages //adicionando a 1º e a última página ao array de paginas
            const pagesAfterSelectedPage =  currentPage <= selectedPage + 2
            const pagesBeforeSelectedPage = currentPage >= selectedPage - 2


            if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
                // se for a 1º,  a última, as 2 páginas a frente e 
                //as 2 páginas anteriores adicione no vetor de páginas
                
                // Lógica dos "..." na paginação
                // se o oldpage existir e a diferença da pagina anterior com a página atual for maior que 2
                // então adicione o "..."  após o pagesAfterSelected
                if (oldPage && currentPage - oldPage > 2) {
                    pages.push("...")
                }
                // Caso o oldpage existir, e a diferença seja igual a 2, então mostre o número anterior ao último elemento
                if(oldPage && currentPage - oldPage == 2){
                    pages.push(oldPage + 1)
                }

                pages.push(currentPage)

                oldPage = currentPage
            }
        }
    return pages
}

function createPagination(pagination) {
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

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}

pagesEffect(currentPage)
