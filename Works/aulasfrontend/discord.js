const discordOverlay = document.querySelector('.discord-overlay');
const discord = document.querySelector('.discord');

discord.addEventListener("click", function(){
    discordOverlay.classList.add("active");
});

document.querySelector(".close-modal").addEventListener("click", function(){
    discordOverlay.classList.remove("active");
});