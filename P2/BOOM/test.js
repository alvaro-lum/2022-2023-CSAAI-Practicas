// Variables globales
var claveSecreta = [];
var contadorInterval;
var segundos = 0;
var aciertos = 0;

// Funciones
function generarClaveSecreta() {
  for (var i = 0; i < 4; i++) {
    claveSecreta[i] = Math.floor(Math.random() * 10);
  }
}

function ocultarClaveSecreta() {
  var claveSecretaDiv = document.getElementById("clave-secreta");
  for (var i = 0; i < 4; i++) {
    claveSecretaDiv.children[i].innerText = "*";
    claveSecretaDiv.children[i].style.color = "black";
  }
}

function pulsarDigito(digito) {
  if (!contadorInterval) {
    contadorInterval = setInterval(actualizarContador, 1000);
  }
  var claveSecretaDiv = document.getElementById("clave-secreta");
  var acierto = false;
  for (var i = 0; i < 4; i++) {
    if (digito == claveSecreta[i]) {
      claveSecretaDiv.children[i].innerText = digito;
      claveSecretaDiv.children[i].style.color = "green";
      acierto = true;
      aciertos++;
    }
  }
  if (!acierto) {
    var contadorDiv = document.getElementById("contador");
    contadorDiv.style.color = "red";
  }
  if (aciertos == 4) {
    clearInterval(contadorInterval);
  }
}

function actualizarContador() {
  segundos++;
  var contadorDiv = document.getElementById("contador");
  contadorDiv.innerText = segundos;
}

function start() {
  if (!contadorInterval) {
    contadorInterval = setInterval(actualizarContador, 1000);
  }
}

function stop() {
  clearInterval(contadorInterval);
}

function reset() {
  clearInterval(contadorInterval);
  segundos = 0;
  aciertos = 0;
  generarClaveSecreta();
  ocultarClaveSecreta();
  var contadorDiv = document.getElementById("contador");
  contadorDiv.innerText = "0";
  contadorDiv.style.color = "black";
}

// Eventos
document.addEventListener("DOMContentLoaded", function(event) {
  generarClaveSecreta();
  ocultarClaveSecreta();
});

var digitos = document.getElementsByClassName("digito");
for (var i = 0; i < digitos.length; i++) {
  digitos[i].addEventListener("click", function(event) {
    var digito = parseInt(event.target.innerText);
    pulsarDigito(digito);
  });
}

var startButton = document.getElementById("start-button");
startButton.addEventListener("click", start);

var stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", stop);

var resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", reset);
