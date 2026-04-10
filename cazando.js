let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");
 
function graficarGato(){
    ctx.fillStyle = "#F2EEED"
    ctx.fillRect(canvas.width/4,canvas.height/4,canvas.width*2/4,canvas.height*2/4);
}