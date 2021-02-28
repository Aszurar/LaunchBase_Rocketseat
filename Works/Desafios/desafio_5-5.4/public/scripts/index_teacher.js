const teachers = document.querySelectorAll(".teacher")
console.log(teachers);

teachers.forEach(teacher => {
    let amount = teacher.querySelector(".amount_student")
    console.log(amount);
    
    if (Number(amount.innerHTML) > 0 && Number(amount.innerHTML) < 5) {
        amount.classList.add('orange')
    } else if (Number(amount.innerHTML) >= 5) {
        amount.classList.add('red')
    }
});