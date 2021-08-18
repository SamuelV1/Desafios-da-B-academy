document.querySelector('.app').innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`
let container = document.querySelector('.app')

document.getElementById('link').addEventListener("click",
  () => (container.classList.contains('invisivel') ? document.querySelector('.app').classList.remove('invisivel') : document.querySelector('.app').classList.add('invisivel')))