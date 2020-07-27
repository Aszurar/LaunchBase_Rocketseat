const cardOverlay = document.querySelector('.card-project-overlay');
const cardsProjects = document.querySelectorAll('.image-project');
const cardModal = document.querySelector('.card-project-modal');

for (const card of cardsProjects) {
    card.addEventListener("click", function () {
        const videoId = card.getAttribute("id");
        const titlecard = card.getAttribute("title");
        console.log(titlecard);
        cardOverlay.classList.add('active');
        cardOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoId}`;
        
        cardModal.querySelector("h1").innerText = titlecard;
    });
}

document.querySelector('.close-modal').addEventListener("click", function () {
    cardOverlay.classList.remove('active');
    cardModal.classList.remove("maximize");
    cardOverlay.querySelector("iframe").src = '';
});

document.querySelector(".max-modal").addEventListener("click", function () {
    cardModal.classList.add("maximize");
});

document.querySelector(".min-modal").addEventListener("click", function () {
    cardModal.classList.remove("maximize");
});
