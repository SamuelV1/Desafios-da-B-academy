import './style.css'
import insert_Row from './cars'



// função  para iniciar meu programa 
window.onload = function () {
    iniciar()
    addlisteners()
}
// eu coloquei isso dentro de uma função pois ele estava disparando duas vezes (javascript achava que tinha 2 eventlistener e disparava 2 vezes)
function addlisteners() {
    let formulario = document.getElementById('formulario')
    // algo nesse corno esta fazendo ele disparar duas vezes
    formulario.addEventListener('submit', event => {
        // evitar que o usuario seja redirecionado ao enviar 
        event.preventDefault();
        // coletador de dados do formulario
        dataForm()
    })
}

// fetch inicial com map
function iniciar() {
    fetch(`http://localhost:3333/cars`)
        .then(response => response.json())
        .then(el => (el.length <= 0 ? errorHandler("Nenhum Veiculo encontrado no banco de dados", true) : el.map(el => { return insert_Row(el.brandModel, el.year, el.color, el.image, el.plate) })))
        .catch(error => console.log(error))
}

async function dataForm() {
    let marcaVeiculo = document.getElementById('Marca-Veiculo').value
    let anoVeiculo = document.getElementById('anoVeiculo').value
    let corVeiculo = document.getElementById('CorVeiculo').value
    let fotoVeiculo = document.getElementById('fotoVeiculo').value
    let placaVeiculo = document.getElementById('placaVeiculo').value
    await serverStorage(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo, placaVeiculo)
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
        .then(response => response.json())                                      // operadores ternarios tem algo contra arrow functions ou o uso de false true dentro delas dessa forma acabei criando uma 3 função meio inutil 
        .then(json => json.error === true ? errorHandler(json.message, true) : registryCar(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo, placaVeiculo))
}
function registryCar(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo, placaVeiculo) {
    insert_Row(marcaVeiculo, anoVeiculo, corVeiculo, fotoVeiculo, placaVeiculo)
    errorHandler("Veiculo Registrado", false)
}


// toaster de erros & adaptado para ser de sucesso tbm
export default function errorHandler(mensaggem, erro) {
    let toaster = document.getElementById('errorwindo')
    toaster.innerText = mensaggem
    // se tiver erro vc sinaliza como true caso n tenha vira falso
    if (erro === true) {
        toaster.style.backgroundColor = '#ff3a1c'
    } else toaster.style.backgroundColor = '#2ecc71'
    setTimeout(function () {


        toaster.classList.add('show')
        toaster.classList.add('fade-in')

    }, 100)
    setTimeout(function () {

        toaster.classList.remove('show')

    }, 5000)
}