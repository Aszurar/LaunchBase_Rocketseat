const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('.modal');

cards.forEach(card => {
    card.addEventListener("click", function () {
        const imgcard = card.getAttribute("id");
        const titlemodal = card.querySelector("h1").textContent;
        const authormodal = card.querySelector("p").textContent;

        modalOverlay.classList.add("active");

        modalOverlay.querySelector("img").src = `./assets/${imgcard}.png`;
        modal.querySelector("h1").innerText = titlemodal;
        modal.querySelector("p").innerText = authormodal;

    });
});

document.querySelector('.close-modal-overlay').addEventListener("click", function () {
    modalOverlay.classList.remove("active");

});
