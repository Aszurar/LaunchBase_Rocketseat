const cardsProjects = document.querySelectorAll('.image-project');
const cardModal = document.querySelector('.card-project-modal');

for (const card of cardsProjects) {
    card.addEventListener("click", function () {
        const videoId = card.getAttribute("id");
        const titlecard = card.getAttribute("title");
        window.location.href = `/video?id=${videoId}`;
        cardModal.querySelector("h1").innerText = titlecard;
    });
}

