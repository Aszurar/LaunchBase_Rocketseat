// função que ativa o css:hover do span dos gêneros
function spanToggle() {
    const manInput = document.getElementById('man-input')
    const girlInput = document.getElementById('girl-input')
    const manSpan = document.getElementById('man-span')
    const girlSpan = document.getElementById('girl-span')

    manInput.addEventListener("click", () => {
        manSpan.classList.add("activate")
        girlSpan.classList.remove("activate")
    })

    girlInput.addEventListener("click", () => {
            girlSpan.classList.add("activate")
            manSpan.classList.remove("activate")
    })

}

spanToggle()