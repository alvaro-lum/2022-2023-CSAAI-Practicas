

//CRONOMETRO
//-- Clase cronómetro
class Crono {

  //-- Constructor. Hay que indicar el 
  //-- display donde mostrar el cronómetro
  constructor(display) {
      this.display = display;

      //-- Tiempo
      this.cent = 0, //-- Centésimas
      this.seg = 0,  //-- Segundos
      this.min = 0,  //-- Minutos
      this.timer = 0;  //-- Temporizador asociado
  }

  //-- Método que se ejecuta cada centésima
  tic() {
      //-- Incrementar en una centesima
      this.cent += 1;

      //-- 100 centésimas hacen 1 segundo
      if (this.cent == 100) {
      this.seg += 1;
      this.cent = 0;
      }

      //-- 60 segundos hacen un minuto
      if (this.seg == 60) {
      this.min = 1;
      this.seg = 0;
      }

      //-- Mostrar el valor actual
      this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
  }

  //-- Arrancar el cronómetro
  start() {
     if (!this.timer) {
        //-- Lanzar el temporizador para que llame 
        //-- al método tic cada 10ms (una centésima)
        this.timer = setInterval( () => {
            this.tic();
        }, 10);
      }
  }

  //-- Parar el cronómetro
  stop() {
      if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
      }
  }

  //-- Reset del cronómetro
  reset() {
      this.cent = 0;
      this.seg = 0;
      this.min = 0;

      this.display.innerHTML = "0:0:0";
  }
}
//-- Coordenadas iniciales del proyectil
let x = 2;
let y = 335;
let xp = x;
let yp = y;

//-- Coordenadas iniciales del objetivo
let xomin = 660;
let xomax = 340;
var xo = getRandomXO(xomax - xomin) + xomin;
let yo = 355;
//CANVAS
const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 700;
canvas.height = 400;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

var targetX, targetY;

//FUNCION LANZAR PROYECTIL

//-- Velocidad del proyectil
var tirolanzado=false;

let angle = 45;
let velocity = 50;
var g = 9.81;
time = 0;

//-- Función principal de actualización
dibujarO(xo,yo); // Pintar el objetivo

dibujarP(x, y, xp, yp, "brown"); // Pintar el proyectil
function lanzar() {
  //-- Implementación del algoritmo de animación:
  //-- 1) Actualizar posición de los elementos 

  //-- Actualizar las posiciones según la velocidad actual
  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //-- 3) Pintar los elementos en el canvas
  dibujarO(xo,yo); // Pintar el objetivo

  dibujarP(x, y, 40, 40, "brown"); // Pintar el proyectil

  // IMPLEMENTACION DE COLISIONES.

  requestAnimationFrame(lanzar);

  
  //-- 4) Repetir
  if (tirolanzado) {
    tiroP();
}
  if (((x > (xo - 40)) && (x < (xo+5))) && (((yo +40) > y) && ((yo-40) < y))){
      
      console.log("Has ganado")
      crono.stop();
      message.innerText = "Has ganado";
      message.innerHTML = "Has ganado";
      tirolanzado=false;
  }else if ((x >= canvas.width || x <= 0) || (y >= canvas.height || y <= 0 )){
      console.log("Has perdido")
      crono.stop();
      message.innerText = "Has perdido, reinicia el juego";
      message.innerHTML = "Has perdido, reinicia el juego";
      tirolanzado = false;
  }
}

//CUADRADO (PROYECTIL)
//-- función para pintar el proyectil
function dibujarP(x,y,lx,ly,color) {

  //-- Pintando el proyectil
  ctx.beginPath();

  //-- Definir un rectángulo de dimensiones lx x ly,
  ctx.rect(x, y, 40,40);

  //-- Color de relleno del rectángulo
  ctx.fillStyle = color;

  //-- Mostrar el relleno
  ctx.fill();

  //-- Mostrar el trazo del rectángulo
  ctx.stroke();

  ctx.closePath();
}
//BOLA QUE SE MOVERA EN X (OBJETIVO)

//-- Generar números aleatorios con un valor máximo
function getRandomXO(max) {
  return Math.floor(Math.random() * max);
}
//-- función para pintar el objetivo
function dibujarO(x) {

  //-- Pintando el objetivo
  ctx.beginPath();

  //-- Dibujar un circulo: coordenadas x,y del centro
  //-- Radio, Angulo inicial y angulo final
  ctx.arc(xo, yo, 20, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'green';

  //-- Dibujar el relleno
  ctx.fill()    

  //-- Dibujar el trazo
  ctx.stroke();

  ctx.closePath();
}
function tiroP() {
  x = xp + velocity * Math.cos(angle* Math.PI / 180) * time;
  y = yp - velocity * Math.sin(angle* Math.PI / 180) * time +0.5 * g * time**2;
  time += 0.1;
}

function ej_tiro(){
  tirolanzado=true
  tiroP();
}
const disp = document.getElementById("display");
const btnLanzar = document.getElementById("disparo");
const angulo = document.getElementById("angulo");
const numAng = document.getElementById("angle");
const btnIniciar = document.getElementById("resetear");
const velocidad = document.getElementById("velocidad");
const numVel = document.getElementById("velocity");
const message = document.getElementById("message");
const sound = document.getElementById("mySound");
const context = new AudioContext();
const src = context.createMediaElementSource(sound);
const gainNode = context.createGain();
const crono = new Crono(disp);


angulo.oninput = () => {
  numAng.innerHTML = angulo.value;
}

angulo.onchange = () => {
numAng.innerHTML = angulo.value;
}

velocidad.oninput = () => {
  numVel.innerHTML = velocidad.value;
}

velocidad.onchange = () => {
numVel.innerHTML = velocidad.value;
}

//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
  
  ej_tiro();
  console.log("Start!!");
  crono.start();
}
//-- Función de retrollamada del botón iniciar
btnIniciar.onclick = () => {
  location.reload();
  console.log("Reset!");
  crono.reset();
}

//-- Escuchar cambios en las barras de cambio
angulo.addEventListener("input", function() {
  //-- Actualizar el valor del ángulo y la etiqueta
  angle = parseFloat(angulo.value);
  numAng.textContent = angle + "°";
});

velocidad.addEventListener("input", function() {
  //-- Actualizar el valor de la velocidad y la etiqueta
  velocity = parseFloat(velocidad.value);
  numVel.textContent = velocity + "m/s";
});
window.addEventListener("load", () => {
  // Reproducir el sonido
  gainNode.gain.value = 0.3;
  src.connect(gainNode);
  gainNode.connect(context.destination);
  sound.play();
});

lanzar();
