let canvas = document.getElementById("areaDeJuego");
let ctx = canvas.getContext("2d");

// Posición del gato
let gatoX = 0;
let gatoY = 0;

// Posición de la comida
let comidaX = 0;
let comidaY = 0;

let puntos = 0; 
const puntajeMaximo = 6; 

// Tiempo
let tiempo = 10; 
let intervaloTiempo = null; 

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


function detenerJuego(mensajeFinal) {
    clearInterval(intervaloTiempo); 

  
    document.getElementById("btnArriba").disabled = true;
    document.getElementById("btnIzquierda").disabled = true;
    document.getElementById("btnAbajo").disabled = true;
    document.getElementById("btnDerecha").disabled = true;

    
    document.getElementById("mensaje").innerText = mensajeFinal;
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

        
        if (puntos >= puntajeMaximo) {
            detenerJuego("¡Felicidades! ¡Has ganado!"); 
            alert("¡Felicidades! ¡Has ganado!"); 
        }
    }
}

function restarTiempo() {
    tiempo--; 
    mostrarEnSpan("tiempo", tiempo); 

    if (tiempo <= 0) {
        detenerJuego("¡Game Over! Se acabó el tiempo."); 
        
    }
}

function reiniciarJuego() {
    
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }

    
    gatoX = 0;
    gatoY = 0;
    comidaX = 0;
    comidaY = 0;
    puntos = 0;
    tiempo = 10; 
    
    actualizarDibujo(); 


    mostrarEnSpan("puntos", puntos); 
    mostrarEnSpan("tiempo", tiempo); 

    document.getElementById("mensaje").innerText = "";

    document.getElementById("btnArriba").disabled = false;
    document.getElementById("btnIzquierda").disabled = false;
    document.getElementById("btnAbajo").disabled = false;
    document.getElementById("btnDerecha").disabled = false;

    iniciarJuego(); 
}


function moverIzquierda() {
    gatoX -= velocidadMovimiento;
    if (gatoX < 0) gatoX = 0;
    actualizarDibujo();
    detectarColision(); 
}

function moverDerecha() {
    gatoX += velocidadMovimiento;
    if (gatoX + anchoGato > canvas.width) gatoX = canvas.width - anchoGato;
    actualizarDibujo();
    detectarColision(); 
}

function moverArriba() {
    gatoY -= velocidadMovimiento;
    if (gatoY < 0) gatoY = 0;
    actualizarDibujo();
    detectarColision(); 
}

function moverAbajo() {
    gatoY += velocidadMovimiento;
    if (gatoY + altoGato > canvas.height) gatoY = canvas.height - altoGato;
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

    tiempo = 10; 
    mostrarEnSpan("tiempo", tiempo); 

    
    document.getElementById("btnArriba").disabled = false;
    document.getElementById("btnIzquierda").disabled = false;
    document.getElementById("btnAbajo").disabled = false;
    document.getElementById("btnDerecha").disabled = false;
    document.getElementById("mensaje").innerText = ""; 

    let btnIzquierda = document.getElementById("btnIzquierda");
    let btnDerecha = document.getElementById("btnDerecha");
    let btnArriba = document.getElementById("btnArriba");
    let btnAbajo = document.getElementById("btnAbajo");
    let btnReiniciar = document.getElementById("btnReiniciar");

    
    if (!btnIzquierda) { console.error("Error crítico: Botón 'btnIzquierda' no encontrado."); return; }
    btnIzquierda.addEventListener('click', moverIzquierda);

    if (!btnDerecha) { console.error("Error crítico: Botón 'btnDerecha' no encontrado."); return; }
    btnDerecha.addEventListener('click', moverDerecha);

    if (!btnArriba) { console.error("Error crítico: Botón 'btnArriba' no encontrado."); return; }
    btnArriba.addEventListener('click', moverArriba);

    if (!btnAbajo) { console.error("Error crítico: Botón 'btnAbajo' no encontrado."); return; }
    btnAbajo.addEventListener('click', moverAbajo);

    if (!btnReiniciar) { console.error("Error crítico: Botón 'btnReiniciar' no encontrado."); return; }
    btnReiniciar.addEventListener('click', reiniciarJuego);

   
    intervaloTiempo = setInterval(restarTiempo, 1000);

    console.log("Juego iniciado correctamente. Controles listos.");
}