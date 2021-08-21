import './style.css'
import insert_Row from './cars'

iniciar()

let formulario = document.getElementById('formulario')

formulario.addEventListener('submit', event => {
    event.preventDefault();
    dataForm()
})

function iniciar() {

    fetch(`http://localhost:3333/cars`)
        .then(response => response.json())
        .then(json => {
            const data = json.map(el => { return insert_Row(el.brandModel, el.year, el.color, el.image, el.plate) })
        })
        .catch(error => console.log(error))
}

function dataForm() {

    let marcaVeiculo = document.getElementById('Marca-Veiculo').value
    let anoVeiculo = document.getElementById('anoVeiculo').value
    let corVeiculo = document.getElementById('CorVeiculo').value
    let fotoVeiculo = document.getElementById('fotoVeiculo').value
    let placaVeiculo = document.getElementById('placaVeiculo').value
    serverStorage(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo, placaVeiculo)
}

function serverStorage(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo, placaVeiculo) {



    fetch('http://localhost:3333/cars', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            image: `${fotoVeiculo}`,
            brandModel: `${marcaVeiculo}`,
            year: `${anoVeiculo}`,
            plate: `${placaVeiculo}`,
            color: `${corVeiculo}`,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => json.error === true ? errorHandler(json.message) : insert_Row(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo, placaVeiculo))

}

export default function errorHandler(mensaggem) {
    let toaster = document.getElementById('errorwindo')
    toaster.innerText = mensaggem
    setTimeout(function () {


        toaster.classList.add('show')
        toaster.classList.add('fade-in')

    }, 100)
    setTimeout(function () {

        toaster.classList.remove('show')

    }, 5000)
    console.log("AAAAAAAAAA")




}