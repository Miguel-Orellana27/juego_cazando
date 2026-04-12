let canvas=document.getElementById("areaDeJuego");
let ctx=canvas.getContext("2d");
//posicion gato
let gatoX=0;
let gatoY=0;
//posicion comida
let comidaX=0;
let comidaY=0;
//Definimos el tamaño del "gato" (rectángulo)
const anchoGato = 80;
const altoGato = 50;
//Definimos el tamaño del cuadrado
const altoComida = 20;
const anchoComida = 20;  
 
function graficarGato() {
    gatoX = (canvas.width / 2) - (anchoGato / 2);
    gatoY = (canvas.height / 2) - (altoGato / 2);
    let colorG= "#1900ff";
    graficarRectangulo(gatoX, gatoY, anchoGato,altoGato, colorG);
}
 
function graficarComida() {
    graficarRectangulo(comidaX,comidaY,anchoComida, altoComida, "#FF0808");
}
 
function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}


const velocidadMovimiento = 10;

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moverIzquierda() {
    gatoX -= velocidadMovimiento;

    if (gatoX < 0) {
        gatoX = 0;
    }

    limpiarCanvas();      
    dibujarComida();      
    dibujarGato();        
}

let btnIzquierda = document.getElementById("btnIzquierda");

function iniciarJuego() {
    graficarGato(); 

    comidaX = Math.random() * (canvas.width - anchoComida);
    comidaY = Math.random() * (canvas.height - altoComida);
    if (comidaX < 0) comidaX = 0;
    if (comidaY < 0) comidaY = 0;
    if (comidaX + anchoComida > canvas.width) comidaX = canvas.width - anchoComida;
    if (comidaY + altoComida > canvas.height) comidaY = canvas.height - altoComida;
    
    graficarComida(); 

    if (btnIzquierda) { 
      btnIzquierda.addEventListener('click', moverIzquierda);
    } else {
      console.error();
    }
}

