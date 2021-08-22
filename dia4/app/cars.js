import errorHandler from './main'

export default function insert_Row(marca, ano, cor, fotourl, placa) {
    var table = document.getElementById('myTable').insertRow(1);
    let fotoveiculo = table.insertCell(0)
    let y = table.insertCell(1);
    let z = table.insertCell(2);
    let ah = table.insertCell(3);
    let Veiculo = table.insertCell(4)
    let excluir = table.insertCell(5)

    fotoveiculo.innerHTML = `<img src='${fotourl}' alt='erro'></img>`
    y.innerHTML = marca;
    z.innerHTML = ano;
    ah.innerHTML = `<div data-variableid2='123333'><div/>`;
    ah.style.backgroundColor = `${cor}`;

    Veiculo.innerHTML = placa;
    Veiculo.classList.add("Placa")
    excluir.innerHTML = `<button id="excluir">X</button>`
    deletarVeiculo()
}

function deletarVeiculo() {
    document.getElementById('excluir').addEventListener('click', (e) => {
        let table = document.getElementById('myTable')

        let index = e.target.parentNode.parentNode.rowIndex

        var row = table.getElementsByTagName('tr')
        console.log(row[index])
        let myrow = row[index].getElementsByClassName('Placa')[0].innerHTML
        removeFromDatabase(myrow, e.target.parentNode.parentNode.rowIndex)

    })
}
function removeFromDatabase(placa, index) {
    let table = document.getElementById('myTable')

    fetch('http://localhost:3333/cars', {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify({
            plate: `${placa}`,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => (json.error === true ? errorHandler(json.message) : table.deleteRow(index)))
}


