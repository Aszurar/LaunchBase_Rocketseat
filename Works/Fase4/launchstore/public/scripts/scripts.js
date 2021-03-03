
const Mask = {
    apply(input, func){
        // Função que executa outra função após uma quantidade de microsegundos dado no 2º parâmetro
        setTimeout(() =>{
            // Chamando a função especificada no parâmetro do apply e passando o parâmetro da propriedade 
            // value do input para atribuir ao mesmo value a formatação desejada
            input.value = Mask[func](input.value)
        }, 1)
    },

    formatBRL(value){
        // Removendo tudo que não for dígito
        value = value.replace(/\D/g, "")

        // formatação do texto em notação de moeda brasileira: R$ 00,00
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value/100)
                // É necessário dividir por 100 pois quando o valor na próxima vez que um valor é digitado.
        // o replace vai remover tudo que não for caracter e transformar número de forma que ocorra o seguinte:
        // 1º vez: 1 -> R$ 1,00
        // 2º vez: 1 -> 100 + 1(concatenação) > R$ 1001,00
        // Logo é sempre necessário dividir por 100 para que o valor digitado sempre fique na casa decimal
        // apropriada
    },
}

const Activates = {
    deleteAlert(deleteForm){
        const confirmation = confirm("Tem certeza que quer deletar?")
        
        if(!confirmation){
           event.preventDefault()
        }
    },

    labelToggle(input) {
        const onLabel = document.getElementById('status-on')
        const offLabel = document.getElementById('status-off')
    
        
        if (input.value == 1) {
            onLabel.classList.add("activate")
            offLabel.classList.remove("activate")
        } else {
            offLabel.classList.add("activate")
            onLabel.classList.remove("activate")
        }

        // console.log(input.value);
        // console.log(input.getAttributeNames().includes('checked'));
    
        // ativar os CSS na página de edição
    
    }, 
    label() {
        const onInput = document.querySelector('#status-on input')
        const offInput = document.querySelector('#status-off input')
        const onLabel = document.getElementById('status-on')
        const offLabel = document.getElementById('status-off')

        if (onInput.checked) {
            // console.log(`Input do sim: ${onInput.checked}`);
            onLabel.classList.add('activate')
        } else if (offInput.checked){
            // console.log(`Input do Não: ${offInput.checked}`);
            offLabel.classList.add('activate')
        }

    }
}

const PhotosUpload = {
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    //função que avisa a pessoa a submetere
    //somente 6 fotos
    handleFileInput(event) {
        //pegando o array de fotos do input
        const { files: fileList } = event.target
        
        if (PhotosUpload.hasLimit(event)) return
        //Forçando o fileList ser um Array e percorrer cada upload
        //foto desse array para:
        Array.from(fileList).forEach(file => {
            //new fileRedaer cria um objeto no formato BLOB que é do tipo texto, ou seja
            //a imagem é transformada em um texto
            const reader = new FileReader()

            //Após ler a imagem atual, aplique essa função que se
            // tem o  objetivo de mostrar ao usuário as imagens inseridas na página web.
            reader.onload = () => {
                const image = new Image() //criando um objeto de imagens
                //ele é do tipo <img src="" >
                image.src= String(reader.result) // adicionando a imagem inserida atual nesse objeto

                //cria a lógica de mostrar essa imagem ao usuário
                const div = PhotosUpload.getContainer(image)
                //por fim, adicione essa div com a imagem dentro do bloco de photos-preview
                PhotosUpload.preview.appendChild(div)
            }

            //leitura da imagem atual do array de imagens e transformando-a em um BLOB
            reader.readAsDataURL(file)
        })
    },
    
    hasLimit(event){
        const { uploadLimit } = PhotosUpload
        const {files: fileList } = event.target
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()   
            return true
        }

        return false
    },

    getContainer(image) {
        //criação do bloco div que contém a imagem lida na função acima
        const div = document.createElement('div')
        div.classList.add('photo')    
        
        div.appendChild(image)
        div.onclick = PhotosUpload.removePhoto

        //adiconando o ícone de remover
        div.appendChild(PhotosUpload.getRemoveButton())
        return div
    }, 

    getRemoveButton() {
        //adcionando o ícone de remover
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'
        return button
    },
    removePhoto(event) {
        //pegando a div.photo que contém a imagem que foi clicada
        //no caso, o event.targe se refere a todo conteúdo da div.photo, ou seja,
        //ou a tag img ou a tag i. Colocando o parentNode, nós pegamos o elemento Pai
        //desss elementos que é sua div.photo
        const photoDiv = event.target.parentNode
        // console.log(photoDiv);
       
        //pegando o vetor das imagens, ou seja, todos div.photos
        const photosArray = Array.from(PhotosUpload.preview.children)
        //buscando no vetor de imagens o íncide da imagem clicada
        const index = photosArray.indexOf(photoDiv)
        photoDiv.remove()
    }
}

// Activates.label()

// const formDelete = document.querySelector("#form-delete")

// formDelete.addEventListener("submit", function(event){

//     if(!confirmation){
//         event.preventDefault()
//     }
// })