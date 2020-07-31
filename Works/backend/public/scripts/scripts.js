// selecionando a classe modal-overlay do documento html em que o script é chamado, ou seja,
// da classes.html. O método querySelector serve justamente para seleionar os elementos do html, de qualquer tag, id, classes...
// para tags passa somente o nome dela: body
// para id passa o nome com # ex: #modal
// para classes passa o nome com . ex: .modal
const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card'); //pegando todos os 6 cards de vídeos

//no for abaixo estamos pegando cada card do vetor de cards, ouvindo o evento de click, quando clicamos neles e assim 
//adicionando a nova classe, active no modal-overlay
for (const card of cards) {
    card.addEventListener("click", function () {
        const videoId = card.getAttribute("id");
        modalOverlay.classList.add('active');
        modalOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoId}`;
    });
}

document.querySelector('.close-modal').addEventListener("click", function () {
    modalOverlay.classList.remove('active');
});
