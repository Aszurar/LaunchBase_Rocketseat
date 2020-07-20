const cardOverlay = document.querySelector('.card-certificate-overlay');
const cardscertificates = document.querySelectorAll('.card-certificate');
const cardModal = document.querySelector('.card-certificate-modal');


for (const card of cardscertificates) {
    card.addEventListener("click", function () {
        const certId = card.getAttribute("id");
        cardOverlay.classList.add('active');
        cardOverlay.querySelector("iframe").src = `../assets/certi${certId}.png`;

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
