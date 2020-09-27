const currentPath = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

console.log(menuItems);

menuItems.forEach(item => {
    if(currentPath.includes(item.getAttribute("href"))){
        item.classList.add("active");
    }
});