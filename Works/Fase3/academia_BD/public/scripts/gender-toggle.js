// função que ativa o css:hover do span dos gêneros
function labelToggle() {
    const manInput = document.getElementById('man-input')
    const girlInput = document.getElementById('girl-input')
    const manLabel = document.getElementById('man-label')
    const girLabel = document.getElementById('girl-label')

    manInput.addEventListener("click", () => {
        manLabel.classList.add("activate")
        girLabel.classList.remove("activate")
    })

    girlInput.addEventListener("click", () => {
            girLabel.classList.add("activate")
            manLabel.classList.remove("activate")
    })

}

labelToggle()