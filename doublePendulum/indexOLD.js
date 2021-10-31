import { Matrix } from '/node_modules/ml-matrix/matrix.js';

const matrix = Matrix.ones(5, 5);
function G(y, t)
{
    a1d = y[0][0];
    a2d = y[1][0];
    a1 = y[2][0];
    a2 = y[3][0];

    m11 = (m1 + m2)*l1;
    m12 = m2*l2*Math.cos(a1-a2);

    m21 = l1*Math.cos(a1-a2);
    m22 = l2;

    var m = [[m11,m12],
             [m21,m22]];
    
    f1 = -m2*l2*a2d*a2d*Math.sin(a1-a2) - (m1+m2)*g*Math.sin(a1);
    f2 = l1*a1d*a1d*Math.sin(a1-a2) - g*Math.sin(a2);

    var f = [[f1], [f2]];
    var accel = matrix_multiplication(invert_2x2(m), f);

    return [[accel[0]],
            [accel[1]],
            [a1d],
            [a2d]];
}

function RK4_step(y, t, dt)
{

    k1 = G(y,t);
    //console.log(k1);
    k2 = G(matrix_add(matrix_scalar(k1, dt*0.5), y), t + 0.5*dt);
    k3 = G(matrix_add(matrix_scalar(k2, dt*0.5), y), t + 0.5*dt);
    k4 = G(matrix_add(matrix_scalar(k3, dt), y), t + dt);

    var tempSum = matrix_add(matrix_scalar(k2, 2), matrix_scalar(k3, 2));
    console.log(typeof matrix_add(matrix_scalar(k2, 2), matrix_scalar(k3, 2))[3][0])
    tempSum = matrix_add(tempSum, k1);
    tempSum = matrix_add(tempSum, k4);
    tempSum = matrix_scalar(tempSum, dt/6);

    return tempSum;
}

var m1 = 1;
var m2 = 2;

var l1 = 1;
var l2 = 2;

var g = 9.82;

var delta_t = 0.01;

var y = [[0],
         [0],
         [0],
         [1]];

var running = false;
var t = 0;

for (t;t<1;t+=delta_t)
{   
    y = y + RK4_step(y, t, delta_t);
}