const discordOverlay = document.querySelector('.discord-overlay');
const discord = document.querySelector('.discord');

const studentOverlay = document.querySelector('.student-overlay');
const student = document.querySelector('.student-card');

const modalStudent = document.querySelector('.modal-student');

discord.addEventListener("click", function(){
    discordOverlay.classList.add("active");
});

student.addEventListener("click", function(){
        studentOverlay.classList.add("active");
});

document.querySelector(".close-modal").addEventListener("click", function(){
    discordOverlay.classList.remove("active");
});

document.querySelector(".max-modal").addEventListener("click", function() {
    modalStudent.classList.add("maximize");
});

document.querySelector(".modal-student .close-modal").addEventListener("click", function(){
    studentOverlay.classList.remove("active");
    modalStudent.classList.remove("maximize");

});

document.querySelector(".min-modal").addEventListener("click", function(){
    modalStudent.classList.remove("maximize");
});