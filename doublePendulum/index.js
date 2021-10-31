const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

const g = 0.1;

class Pendulum
{
    constructor()
    {
        this.a1 = 3;
        this.a2 = 3;

        this.w1 = 0;
        this.w2 = 0;

        this.l1 = 150;
        this.l2 = 150;

        this.m1 = 10;
        this.m2 = 10;

        this.t = 0;
        this.h = 0.005;

        this.x_offset = canvas.width/2;
        this.y_offset = canvas.height/2;
    }

    update()
    {
        //this.w1 = this.runge_kutta4(1);
        //this.w2 = this.runge_kutta4(2);
        this.w1 += this.f1();
        this.w2 += this.f2();

        this.a1 += this.w1;
        this.a2 += this.w2;

        //this.w1*=0.999;
        //this.w2*=0.999;
        

        //this.t += this.h;
    }
    
    runge_kutta4(i)
    {
        if (i == 1)
        {
            var a = this.f1(this.t, this.w);
            //onsole.log(a);
            var b = this.f1(this.t + this.h/2, this.w + a*this.h/2);
            //console.log(b);
            var c = this.f1(this.t + this.h/2, this.w + b*this.h/2);
            //console.log(c);
            var d = this.f1(this.t + this.h, this.w + this.h*c);
            //console.log(d);
            var y_new = this.w1 + this.h*(a + 2*b + 2*c + d)/6;
            console.log(y_new)
            return y_new;

        }

        else if(i == 2)
        {
            var a = this.f2(this.t, this.w);
            var b = this.f2(this.t + this.h/2, this.w + a*this.h/2);
            var c = this.f2(this.t + this.h/2, this.w + b*this.h/2);
            var d = this.f2(this.t + this.h, this.w + this.h*c);
            var y_new = this.w2 + this.h*(a + 2*b + 2*c + d)/6;
            return y_new;
        }
    }

    f1()
    {
        //I want to die.
        return (-g*(2*this.m1 + this.m2)*Math.sin(this.a1)-this.m2*g*Math.sin(this.a1 - 2*this.a2)-2*Math.sin(this.a1 - this.a2)*this.m2*(this.w2*this.w2*this.l2+this.w1*this.w1*this.l1*Math.cos(this.a1-this.a2)))/(this.l1*(2*this.m1 + this.m2 -this.m2*Math.cos(2*this.a1-2*this.a2)));
    }

    f2()
    {
        //I want to die pt2.
        return (2*Math.sin(this.a1-this.a2)*(this.w1*this.w1*this.l1*(this.m1+this.m2)+g*(this.m1+this.m2)*Math.cos(this.a1)+this.w2*this.w2*this.l2*this.m2*Math.cos(this.a1-this.a2)))/(this.l2*(2*this.m1+this.m2-this.m2*Math.cos(2*this.a1-2*this.a2)))
    }




    draw()
    {   
        let x1 = this.l1*Math.sin(this.a1);
        let y1 = this.l1*Math.cos(this.a1);
    
        let x2 = x1 + this.l2*Math.sin(this.a2);
        let y2 = y1 + this.l2*Math.cos(this.a2);

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(this.x_offset, this.y_offset);
        ctx.lineTo(x1+this.x_offset, y1+this.y_offset);
        ctx.lineTo(x2+this.x_offset, y2+this.y_offset);
        ctx.stroke();

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x1+this.x_offset,y1+this.y_offset, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2+this.x_offset,y2+this.y_offset, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawGame(){
    requestAnimationFrame(drawGame);
    clearScreen();
    pendulum.update();
    pendulum.draw();
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

pendulum = new Pendulum();
drawGame();