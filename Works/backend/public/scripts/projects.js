const cardsProjects = document.querySelectorAll('.image-project');

for (const card of cardsProjects) {
    card.addEventListener("click", function () {
        const videoId = card.getAttribute("id");
        window.open(`/video?id=${videoId}`);
    });
}

