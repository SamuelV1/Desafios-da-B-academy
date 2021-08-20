import insert_Row from './cars'

let formulario = document.getElementById('formulario')
var container = document.getElementById('colorcontainer')

formulario.addEventListener('submit', event => {
    event.preventDefault();
    coletarDadosForm()
    colorpicker()
    veiculoTAble()
});

function veiculoTAble() {
    let marcaVeiculo = document.getElementById('Marca-Veiculo').value
    let anoVeiculo = document.getElementById('anoVeiculo').value
    let corVeiculo = document.getElementById('CorVeiculo').value
    let fotoVeiculo = document.getElementById('fotoVeiculo').value
    insert_Row(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo)
}
// criando select

// cores do select
var coloroptions = ["red", "blue", "yellow", "green", "purple"];

var colorselect = document.createElement("select");
colorselect.id = "colorpicker";
colorselect.multiple = true
formulario.appendChild(colorselect);

for (var i = 0; i < coloroptions.length; i++) {
    var option = document.createElement("option");
    option.value = coloroptions[i];
    option.text = coloroptions[i];
    colorselect.appendChild(option);
}

function colorpicker() {
    let cor = document.getElementById('colorpicker')
    let selectedValues = Array.from(cor.selectedOptions)
        .map(option => option.value) // make sure you know what '.map' does

    selectedValues.map(function (num) {
        let blocodecor = document.createElement('div')

        blocodecor.classList.add("corEscolhida");
        blocodecor.style.background = `${num}`
        container.appendChild(blocodecor)
    })



}



// resetador de nome exercicio1
function coletarDadosForm() {
    // container
    let nomeContainer = document.getElementById('Nomes')
    // conjuntores 
    const conjuntores = ["da", "de", "do", "dos"]
    // coletando o nome 
    let Nome = document.getElementById('Nome').value

    const diminuir = Nome.toLowerCase()

    const words = diminuir.split(" ");

    for (let i = 0; i < words.length; i++) {
        if (conjuntores.includes(words[i])) {
            console.log(" ")
        } else words[i] = words[i][0].toUpperCase() + words[i].substr(1);

    }
    let result = words.join(" ");

    let NomeConvertido = document.createElement('p')
    nomeContainer.textContent = `Bem vindo: ${result}`
    container.appendChild(NomeConvertido)


}
