const currentPage = location.pathname;
const links = document.querySelectorAll(".links a");

console.log(currentPage);   
console.log(links);

links.forEach( item => {
    console.log(item.getAttribute("href"));
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }    
});