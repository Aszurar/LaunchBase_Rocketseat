const discordOverlay = document.querySelector('.discord-overlay');
const discord = document.querySelector('.discord');

const xboxOverlay = document.querySelector('.xbox-overlay');
const xbox = document.querySelector('.xbox');



discord.addEventListener("click", function () {
    discordOverlay.classList.add("active");
});



document.querySelector(".close-modal").addEventListener("click", function () {
    discordOverlay.classList.remove("active");
});

xbox.addEventListener("click", function () {
    xboxOverlay.classList.add("active");
});

document.querySelector(".close-modal-xbox").addEventListener("click", function () {
    xboxOverlay.classList.remove("active");
});

