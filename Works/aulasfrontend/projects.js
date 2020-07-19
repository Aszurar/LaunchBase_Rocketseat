const cardOverlay = document.querySelector('.card-project-overlay');
const cardsProjects = document.querySelectorAll('.image-project');
const cardModal = document.querySelector('.card-project-modal');

//tentativa frustrada de criar um elemento html via javascript
// var modalContent = document.getElementById("modalContent");
// var page = document.getElementById("pageIframe");
// var newdiv = document.createElement("div");
// var content = document.createTextNode("Olaaaaaaaaaa");
// newdiv.appendChild(content);
// document.modalContent.insertBefore(newH1, page);

for (const card of cardsProjects) {
    card.addEventListener("click", function(){
        const videoId = card.getAttribute("id");
        // const titleId = card.getAttribute("titleId");
        cardOverlay.classList.add('active');
        cardOverlay.querySelector("iframe").src=`https://www.youtube.com/embed/${videoId}`;

    });
}

document.querySelector('.close-modal').addEventListener("click", function(){
    cardOverlay.classList.remove('active');
    cardModal.classList.remove("maximize");
    cardOverlay.querySelector("iframe").src='';

});

document.querySelector(".max-modal").addEventListener("click", function() {
    cardModal.classList.add("maximize");
});

document.querySelector(".min-modal").addEventListener("click", function(){
    cardModal.classList.remove("maximize");
});
