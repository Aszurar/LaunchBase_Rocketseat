const button1 = document.querySelector('.test1');
const check = document.querySelector('#check1');


button1.addEventListener("click", () => { 
    button1.classList.add('active');
});




check.addEventListener("click", function() {
    button1.classList.remove('active');
});


