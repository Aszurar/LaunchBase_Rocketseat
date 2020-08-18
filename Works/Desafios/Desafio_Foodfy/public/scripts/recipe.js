const buttons = document.querySelectorAll('.button');
const datas = document.querySelectorAll('.data');

buttons.forEach(button => {
    
    button.addEventListener("click", function() {
        
        // datas.forEach(data => {
            datas.classList.add("active");
        // });

    });
});

// buttons.forEach(button => {
    
//     button.addEventListener("click", function() {
        
//         datas.forEach(data => {
//             data.classList.remove("active");
//         });
        
//     });
// });