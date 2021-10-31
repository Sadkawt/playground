function log(msg){
    console.log(msg);
}

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;

let xVel = 10;
let yVel = 10;

let radius = 50;

function drawGame(){
    clearScreen();
    updatePos();
    drawGreenBlob();
    requestAnimationFrame(drawGame);
}

function updatePos(){
    x += xVel;
    y += yVel;

    if (canvas.width < x + radius || 0 > x - radius){
        xVel *= -1;
    }

    if (canvas.height < y + radius || 0 > y - radius){
        yVel *= -1;
    }
}

function drawGreenBlob(){
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x,y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

drawGame();
//setInterval(drawGame, 1000/60);