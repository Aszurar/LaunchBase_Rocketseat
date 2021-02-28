const button1 = document.querySelector('.test1');
const check1 = document.querySelector('#check1');
const ct1 = document.querySelector('.ct1');

const button2 = document.querySelector('.test2');
const check2 = document.querySelector('#check2');
const ct2 = document.querySelector('.ct2');



check1.addEventListener("click", () => { 
    button1.classList.toggle('active');
    ct1.classList.toggle('active');
});  

check2.addEventListener("click", () => {
    button2.classList.toggle('active');
    ct2.classList.toggle('active');
});

