let canvas = document.getElementById("areaDeJuego");
let ctx = canvas.getContext("2d");

// Posición del gato
let gatoX = 0;
let gatoY = 0;

// Posición de la comida
let comidaX = 0;
let comidaY = 0;

// Dimensiones
const anchoGato = 80;
const altoGato = 50;
const anchoComida = 20;
const altoComida = 20;
const velocidadMovimiento = 10; 



function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
    if (gatoX === 0 && gatoY === 0) {
        gatoX = (canvas.width / 2) - (anchoGato / 2);
        gatoY = (canvas.height / 2) - (altoGato / 2);
    }
    let colorGato = "#1900ffba"; 
    graficarRectangulo(gatoX, gatoY, anchoGato, altoGato, colorGato);
}

function graficarComida() {
    let colorComida = "#08ffded8"; 
    graficarRectangulo(comidaX, comidaY, anchoComida, altoComida, colorComida);
}



function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarDibujo() {
    limpiarCanvas();   
    graficarComida();   
    graficarGato();    
}


function detectarColision() {
    if (gatoX + anchoGato > comidaX &&
        gatoX < comidaX + anchoComida &&
        gatoY + altoGato > comidaY &&
        gatoY < comidaY + altoComida) {
        
       
       
        comidaX = generarAleatorio(0, canvas.width - anchoComida);
        comidaY = generarAleatorio(0, canvas.height - altoComida);
        
       
        actualizarDibujo(); 

        
        puntos++; 
        mostrarEnSpan("puntos", puntos); 
    }
}



function moverIzquierda() {
    gatoX -= velocidadMovimiento;
    if (gatoX < 0) {
        gatoX = 0;
    }
    actualizarDibujo();
    detectarColision(); 
}

function moverDerecha() {
    gatoX += velocidadMovimiento;
    if (gatoX + anchoGato > canvas.width) {
        gatoX = canvas.width - anchoGato; 
    }
    actualizarDibujo();
    detectarColision(); 
}

function moverArriba() {
    gatoY -= velocidadMovimiento;
    if (gatoY < 0) {
        gatoY = 0; 
    }
    actualizarDibujo();
    detectarColision(); 
}

function moverAbajo() {
    gatoY += velocidadMovimiento;
    if (gatoY + altoGato > canvas.height) {
        gatoY = canvas.height - altoGato; 
    }
    actualizarDibujo();
    detectarColision(); 
}




function iniciarJuego() {
  
    graficarGato();

    
    comidaX = generarAleatorio(0, canvas.width - anchoComida);
    comidaY = generarAleatorio(0, canvas.height - altoComida);

    
    graficarComida();

    
    puntos = 0;
    mostrarEnSpan("puntos", puntos); 


    let btnIzquierda = document.getElementById("btnIzquierda");
    let btnDerecha = document.getElementById("btnDerecha");
    let btnArriba = document.getElementById("btnArriba");
    let btnAbajo = document.getElementById("btnAbajo");

    if (!btnIzquierda) {
        console.error("Error crítico: Botón 'btnIzquierda' no encontrado. No se puede continuar.");
        return;
    }
    btnIzquierda.addEventListener('click', moverIzquierda);

    if (!btnDerecha) {
        console.error("Error crítico: Botón 'btnDerecha' no encontrado. No se puede continuar.");
        return;
    }
    btnDerecha.addEventListener('click', moverDerecha);

    if (!btnArriba) {
        console.error("Error crítico: Botón 'btnArriba' no encontrado. No se puede continuar.");
        return;
    }
    btnArriba.addEventListener('click', moverArriba);

    if (!btnAbajo) {
        console.error("Error crítico: Botón 'btnAbajo' no encontrado. No se puede continuar.");
        return;
    }
    btnAbajo.addEventListener('click', moverAbajo);

    console.log("Juego iniciado correctamente. Controles listos.");
}