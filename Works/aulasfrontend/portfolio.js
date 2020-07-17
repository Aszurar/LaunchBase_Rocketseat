const discordOverlay = document.querySelector('.discord-overlay');
const discord = document.querySelector('.discord');

const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('.modal');

discord.addEventListener("click", function(){
    discordOverlay.classList.add("active");
});

document.querySelector(".close-modal").addEventListener("click", function(){
    discordOverlay.classList.remove("active");
});

cards.forEach(card => {
        card.addEventListener("click", function(){
        const typecard = card.getAttribute("id");
        modalOverlay.classList.add("active");
        modal.classList.add(typecard)
    });
});

cards.forEach(card => {
    const typecard = card.getAttribute("id");
    
    document.querySelector('.close-modal-overlay').addEventListener("click", function(){
        modal.classList.remove(typecard);
    });
});

document.querySelector('.close-modal-overlay').addEventListener("click", function() {
    modalOverlay.classList.remove("active");
    modal.classList.remove("maximize");
});

document.querySelector(".max-modal").addEventListener("click", function() {
    modal.classList.add("maximize");
});

document.querySelector(".min-modal").addEventListener("click", function(){
    modal.classList.remove("maximize");
});