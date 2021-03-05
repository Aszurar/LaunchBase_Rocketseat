
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
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    //função que avisa a pessoa a submetere
    //somente 6 fotos
    handleFileInput(event) {
        //pegando o array de fotos do input
        const { files: fileList } = event.target
        PhotosUpload.input = event.target //pegando o input

        if (PhotosUpload.hasLimit(event)) return
        //Forçando o fileList ser um Array e percorrer cada upload
        //foto desse array para:
        Array.from(fileList).forEach(file => {

            //adicionando cada arquivo de imagem no array files
            PhotosUpload.files.push(file)

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

        //substituindo os arquivos do navegador, pelos que estão no dataTransfer
        event.target.files = PhotosUpload.getAllfiles()
    }, 
    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()   
            return true
        }

        const photosDiv = []
        //No input das fotos, percorra por todas div photo(ou seja, por cada imagem)
        preview.childNodes.forEach( item => {
            //para cada item, verifique se elee realmente é a div photo
            //se for, adicione-o no array criado acima
            if(item.classList && item.classList.value == "photo") {
                photosDiv.push(item)
            }

        })

        const totalPhotos = photosDiv.length + fileList.length
        if (totalPhotos > uploadLimit ) {
            event.preventDefault()
            alert("Você atingiu o número máximo de fotos!")
            return true
        }

        return false
    },
    getAllfiles() {
        //não tem como remover os arquivos do filelist, então é necessário essa lógica
                                //objeto para o Firefox              //objeto para o Chrome
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        //adicione cada arquivo de imagem ao dataTransfer
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))
        //assim é criado um filelist dentro do dataTransfer
        return dataTransfer.files
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
        const photoDiv = event.target.parentNode //<div class="photo">
        // console.log(photoDiv);
       
        //pegando o vetor das imagens, ou seja, todos div.photos
        const photosArray = Array.from(PhotosUpload.preview.children)
        //buscando no vetor de imagens o íncide da imagem clicada
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1) //removendo o arquivo do files
        
        //atualizando os files do input com os files que criamos e removemos o item atual
        PhotosUpload.input.files = PhotosUpload.getAllfiles()
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