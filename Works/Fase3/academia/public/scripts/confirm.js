//confirmação se a pessoa realmente quer deletar ou não?
//caso queira, aperte o ok, se não, aperte para cancelar
//assim entrará no if, de modo que o evento não ocorra com o preventDefalout,
// ele basicamente cancela o cancela o evento de submit
const formDelete = document.querySelector("#form-delete");

formDelete.addEventListener("submit", function (event) {
    const confirmation = confirm("Tem certeza que deseja deletar?");

    if (!confirmation) {
        event.preventDefault()
    }
})