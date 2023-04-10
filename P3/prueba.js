// Definimos las variables globales del juego
var canvas, ctx, targetX, targetY, targetRadius, projectileSize, projectileX, projectileY, angle, velocity, time, timerId, gameRunning;
// Función que se ejecuta al cargar la página
function init() {
    // Obtener el canvas y el contexto para dibujar
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
  
    // Inicializar variables del juego
    targetRadius = 20;
    projectileSize = 10;
    projectileX = 0;
    projectileY = canvas.height - projectileSize;
    angle = 45;
    velocity = 50;
    time = 0;
    timerId = null;
    gameRunning = false;
  
    // Dibujar el campo de tiro
    drawField();
  
    // Dibujar el proyectil y el objetivo
    drawProjectile();
    drawTarget();
  
    // Escuchar el evento click del botón de disparo
    var fireButton = document.getElementById("disparar");
    fireButton.addEventListener("click", disparar);
  
    // Escuchar el evento click del botón de reinicio
    var resetButton = document.getElementById("resetear");
    resetButton.addEventListener("click", resetear);
  
    // Mostrar las posiciones iniciales en los sliders
    var angleSlider = document.getElementById("angle");
    var velocitySlider = document.getElementById("velocity");
    angleSlider.value = angle;
    velocitySlider.value = velocity;
  
    // Actualizar la posición del objetivo aleatoriamente
    randomizeTargetPosition();
  }
// Función para dibujar el campo de tiro
function drawField() {
    // Dibujar el suelo
    ctx.fillStyle = "#999999";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
  
    // Dibujar la pared
    ctx.fillStyle = "#666666";
    ctx.fillRect(canvas.width - 20, 0, 20, canvas.height - 20);
  }
  
  // Función para dibujar el proyectil
  function drawProjectile() {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(projectileX, projectileY, projectileSize, projectileSize);
  }
  
  // Función para dibujar el objetivo
  function drawTarget() {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(targetX, targetY, targetRadius, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Función para actualizar la posición del proyectil en cada frame
  function updateProjectilePosition() {
    // Calcular la posición del proyectil en función del tiempo, la velocidad y el ángulo
    var radians = angle * Math.PI / 180;
    var x = velocity * Math.cos(radians) * time;
    var y = canvas.height - projectileSize - velocity * Math.sin(radians) * time + 0.5 * 9.81 * time * time;
  
    // Actualizar la posición del proyectil
    projectileX = x;
    projectileY = y;
  
    // Incrementar el tiempo
    time += 0.1;
  
    // Dibujar el proyectil en su nueva posición
drawProjectile();

// Comprobar si el proyectil ha colisionado con el objetivo
checkCollision();
}

// Función para comprobar si ha habido colisión entre el proyectil y el objetivo
function checkCollision() {
// Calcular la distancia entre el centro del objetivo y la posición del proyectil
var distanceX = projectileX - targetX;
var distanceY = projectileY - targetY;
var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

// Si la distancia es menor o igual al radio del objetivo, ha habido colisión
if (distance <= targetRadius) {
// Detener el juego
gameRunning = false;

// Detener el temporizador
clearInterval(timerId);

// Mostrar un mensaje de éxito
var message = document.getElementById("message");
message.innerHTML = "¡Has acertado al objetivo!";
}
}

// Función para disparar el proyectil
function fire() {
// Si el juego ya está en marcha, no hacer nada
if (gameRunning) {
return;
}

// Iniciar el juego
gameRunning = true;

// Resetear el mensaje
var message = document.getElementById("message");
message.innerHTML = "";

// Obtener los valores de los sliders de ángulo y velocidad
var angleSlider = document.getElementById("angle");
var velocitySlider = document.getElementById("velocity");
angle = parseInt(angleSlider.value);
velocity = parseInt(velocitySlider.value);

// Reiniciar el tiempo
time = 0;

// Iniciar el temporizador para actualizar la posición del proyectil en cada frame
timerId = setInterval(updateProjectilePosition, 100);
}

// Función para reiniciar el juego
function reset() {
// Detener el temporizador
clearInterval(timerId);

// Resetear variables del juego
targetX = null;
targetY = null;
gameRunning = false;

// Resetear los sliders de ángulo y velocidad
var angleSlider = document.getElementById("angle");
var velocitySlider = document.getElementById("velocity");
angleSlider.value = 45;
velocitySlider.value = 50;

// Resetear el mensaje
var message = document.getElementById("message");
message.innerHTML = "";

// Dibujar el campo de tiro
drawField();

// Dibujar el proyectil y el objetivo
drawProjectile();
drawTarget();

// Actualizar la posición del objetivo aleatoriamente
randomizeTargetPosition();
}

// Función para actualizar la posición del objetivo aleatoriamente
function randomizeTargetPosition() {
// Calcular una posición aleatoria para el objetivo dentro de los límites del canvas
targetX = Math.floor(Math.random() * (canvas.width - 2 * targetRadius)) + targetRadius;
targetY = Math.floor(Math.random() * (canvas.height - 2 * targetRadius)) + targetRadius;

// Dibujar el objetivo en su nueva posición
drawTarget();
}

// Llamar a la función init al cargar la página
window.onload = init;  


var distancia;
//-- Verificar si el proyectil ha alcanzado el objetivo
if (distancia < targetRadius + projectileSize) {
  //-- Parar el juego
  stopGame();
  //-- Mostrar mensaje de ganaste
  showMessage("¡Ganaste!");
  }
  
  //-- Verificar si el proyectil ha tocado la parte inferior del canvas
  if (projectileY >= canvas.height - projectileSize) {
  //-- Parar el juego
  stopGame();
  //-- Mostrar mensaje de perdiste
  showMessage("¡Perdiste!");
  }
  
  //-- Si el juego sigue en ejecución, actualizar la posición del proyectil
  if (gameRunning) {
  projectileX = xop;
  projectileY = yop;
  }
  
  
  //-- Función para detener el juego
  function stopGame() {
  clearInterval(timerId);
  gameRunning = false;
  }
  
  //-- Función para mostrar un mensaje
  function showMessage(message) {
  //-- Obtener el elemento donde se mostrará el mensaje
  const messageElement = document.getElementById("message");
  //-- Mostrar el mensaje
  messageElement.innerHTML = message;
  }
  
  //-- Función para iniciar el juego
  function startGame() {
  //-- Inicializar variables
  time = 0;
  gameRunning = true;
  
  //-- Lanzar el temporizador para actualizar la animación
  timerId = setInterval(actualizar, 10);
  }

  // Verificar si el proyectil ha tocado la parte inferior del canvas
if (projectileY >= canvas.height - projectileSize) {
  stopGame();
  alert("Has perdido");
  }
  //-- Actualizar el tiempo
time += 0.1;

//-- Solicitar la siguiente animación
timerId = requestAnimationFrame(lanzar);


//-- Función para detener la animación
function stopGame() {
cancelAnimationFrame(timerId);
gameRunning = false;
}

//-- Función para iniciar el juego
function startGame() {
if (!gameRunning) {
gameRunning = true;
lanzar();
}
}

//-- Evento para detectar el click del usuario
canvas.addEventListener("click", function(event) {
if (!gameRunning) {
//-- Calcular la posición del click respecto al canvas
var rect = canvas.getBoundingClientRect();
var mouseX = event.clientX - rect.left;
var mouseY = event.clientY - rect.top;
  //-- Verificar si se ha hecho clic en el objetivo
  var dx = mouseX - xo;
  var dy = mouseY - yo;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance <= targetRadius) {
    stopGame();
    alert("¡Has ganado!");
  } else {
    alert("¡Fallaste! Intenta de nuevo");
  }
}
});

// iniciar el juego
startGame();  
  
  
  
  
  