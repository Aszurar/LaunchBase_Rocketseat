const currentPath = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

menuItems.forEach(item => {
    if(currentPath.includes(item.getAttribute("href"))){
        item.classList.add("active");
    }
});