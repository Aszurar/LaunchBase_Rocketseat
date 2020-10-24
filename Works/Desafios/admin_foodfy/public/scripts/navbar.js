const currentPage = location.pathname;
const links = document.querySelectorAll(".links a");


links.forEach( item => {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }    
});