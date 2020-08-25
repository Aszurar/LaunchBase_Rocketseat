
const studentOverlay = document.querySelector('.student-overlay');
const student = document.querySelector('.student-card');

const modalStudent = document.querySelector('.modal-student');

student.addEventListener("click", function () {
    studentOverlay.classList.add("active");
});

document.querySelector(".max-modal").addEventListener("click", function () {
    modalStudent.classList.add("maximize");
});

document.querySelector(".modal-student .close-modal").addEventListener("click", function () {
    studentOverlay.classList.remove("active");
    modalStudent.classList.remove("maximize");

});

document.querySelector(".min-modal").addEventListener("click", function () {
    modalStudent.classList.remove("maximize");
});