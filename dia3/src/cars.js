


export default function insert_Row(marca, ano, cor, fotourl) {
    var table = document.getElementById('myTable').insertRow(1);



    let fotoveiculo = table.insertCell(0)
    let y = table.insertCell(1);
    let z = table.insertCell(2);
    let ah = table.insertCell(3);





    fotoveiculo.innerHTML = `<img src='${fotourl}' alt='erro'></img>`
    y.innerHTML = marca;
    z.innerHTML = ano;
    ah.innerHTML = cor;
}