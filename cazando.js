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
   
 
    // Calculamos el centro exacto del canvas
    // (Ancho del canvas / 2) - (Ancho del objeto / 2)
    gatoX = (canvas.width / 2) - (anchoGato / 2);
    gatoY = (canvas.height / 2) - (altoGato / 2);
    //color del gato
    let colorG= "#1900ff";
    graficarRectangulo(gatoX, gatoY, anchoGato,altoGato, colorG);
}
 
function graficarComida() {
    graficarRectangulo(comidaX,comidaY,anchoComida, altoComida, "#FF0808");
}
 
function iniciarJuego() {
    // Llamamos a las funciones que ya creaste
    graficarGato();
    graficarComida();
}
 
function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
 
}

