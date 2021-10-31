const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
ctx.font = '48px Comic Sans MS';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

class Ball{
    constructor()
    {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.yVel = getRandomArbitrary(-4,4);

        if (getRandomArbitrary(0,2) > 1){var direction = 1;}
        else {var direction = -1;}
        this.xVel = direction*Math.sqrt(Math.pow(5,2)-Math.pow(this.yVel, 2))

        this.radius = 10;

        this.color = "white";
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update()
    {
        this.x += this.xVel;
        this.y += this.yVel;

        if (this.y + this.radius > canvas.height || 0 > this.y - this.radius)
        {
            this.yVel *= -1.1;
        }
    }

    bounce(newPos)
    {
        this.x = newPos
        this.xVel *= -1.05;
    }

    reset(winner)
    {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.yVel = getRandomArbitrary(-4,4);

        if (winner == 1)
        {
            this.xVel = -Math.sqrt(Math.pow(5,2)-Math.pow(this.yVel, 2));
        }
        else
        {
            this.xVel = Math.sqrt(Math.pow(5,2)-Math.pow(this.yVel, 2));
        }
        
    }

    outOfBounds()
    {
        if (this.x - this.radius < 0)
        {
            this.reset(2);
            return 2;
        }
        else if (this.x + this.radius > canvas.width)
        {
            this.reset(1);
            return 1;
        }
        return 0;
    }
}

class Paddel{
    constructor(xPos)
    {
        this.x = xPos;
        this.y = canvas.height/2;

        this.vel = 10;

        this.width = 20;
        this.height = 140;

        this.color = "white";

        // -1 for moving upwards, 1 for moving downwards. 0 for still
        this.moving = 0;
    }

    moveUp()
    {
        if (this.y < 0)
        {
            this.y = 0;
        }
        else
        {
            this.y -= this.vel;
        }
    }

    moveDown()
    {
        if (this.y + this.height > canvas.height)
        {
            this.y = canvas.height - this.height;
        }
        else
        {
            this.y += this.vel;
        }
    }

    update()
    {   
        if (this.moving == -1)
        {
            this.moveUp();
        }

        else if(this.moving == 1)
        {
            this.moveDown();
        }
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x ,this.y , this.width, this.height);
    }

    setMoveStatus(status)
    {
        this.moving = status;
    }
}

class Counter
{
    constructor()
    {
        this.p1 = 0;
        this.p2 = 0;
    }

    draw()
    {
        ctx.fillStyle = "white";
        ctx.fillText(this.p1.toString(), 10, 50);
        ctx.fillText(this.p2.toString(), canvas.width - 50, 50);
    }

    update(player)
    {
        if (player == 1){this.p1 += 1;}
        if (player == 2){this.p2 += 1;}
    }
    
    reset()
    {
        this.p1 = 0;
        this.p2 = 0;
    }
}


function drawGame(){
    requestAnimationFrame(drawGame);
    if (gameWon == false)
    {
        clearScreen(); 
        if (running == true)
        {

            ball.update();
            ball.draw();
            paddel1.update();
            paddel2.update();
            checkCollision();
        }
        paddel1.draw();
        paddel2.draw();
        counter.draw();

        var state = ball.outOfBounds();
        if (state != 0)
        {
            counter.update(state);
            state = 0;
            if (counter.p1 > 2 || counter.p2 > 2)
            {
                gameWon = true;
                if (counter.p1 > counter.p2)
                {
                    winner = 1;
                }
                else
                {
                    winner = 2;
                }
            }
        }
    }
    else
    {
        if (winner == 1)
        {
            counter.draw();
            ctx.fillStyle = "white";
            ctx.fillText("SPELARE 1 HAR VUNNIT (Gratis båga)", 20, 400);
            counter.reset();

        }

        else if (winner == 2)
        {
            counter.draw();
            ctx.fillStyle = "white";
            ctx.fillText("SPELARE 2 HAR VUNNIT (Gratis båga)", 20, 400);
            counter.reset();
        }
    }
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
    if (event.keyCode == 81) {
        paddel1.setMoveStatus(-1);
    }
    else if (event.keyCode == 65) {
        paddel1.setMoveStatus(1);
    }
    else if (event.keyCode == 79) {
        paddel2.setMoveStatus(-1);
    }
    else if (event.keyCode == 76) {
        paddel2.setMoveStatus(1);
    }
    else if (event.keyCode == 13)
    {
        running = true;
        gameWon = false;
    }
}

function keyUp(event) {
    if (event.keyCode == 81) {
        paddel1.setMoveStatus(0);
    }
    else if (event.keyCode == 65) {
        paddel1.setMoveStatus(0);
    }
    else if (event.keyCode == 79) {
        paddel2.setMoveStatus(0);
    }
    else if (event.keyCode == 76) {
        paddel2.setMoveStatus(0);
    }
}

function checkCollision() {
    if (ball.x < paddel1.width && (ball.y + ball.radius > paddel1.y && paddel1.y + paddel1. height > ball.y - ball.radius))
    {
        ball.bounce(paddel1.width + ball.radius)
    } 

    if (ball.x > canvas.width - paddel2.width && (ball.y + ball.radius > paddel2.y && paddel2.y + paddel2. height > ball.y - ball.radius))
    {
        ball.bounce(canvas.width - paddel2.width - ball.radius)
    } 
}


const paddel1 = new Paddel(0);
const paddel2 = new Paddel(canvas.width-20);
const ball = new Ball();
const counter = new Counter();
var running = false;
var gameWon = false;
var winner = 0;
drawGame();
//setInterval(drawGame, 1000/60);