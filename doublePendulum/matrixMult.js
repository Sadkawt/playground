////////////////////////////////////////////////////////////////////////////////////////////////////////////
function matrix_multiplication(M1,M2)
{
    if (M1[0].length != M2.length)
    {
        console.log("Array sizes do not allow for multiplication");
        return null;
    }

    var data = [];
    for (let i = 0; i < M1.length; i++)
    {   
        data.push([]);
        for (let j = 0; j < M2[0].length; j++)
        {
            let tempSum = 0;
            for (let k = 0; k < M2.length; k++)
            {
                 tempSum += M1[i][k] * M2[k][j];
            }
            data[i][j] = tempSum;
        }
    }
    return data;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function matrix_scalar(M, k)
{
    var data = [];
    for (let i = 0; i < M.length; i++)
    {
        data.push([]);
        for (let j = 0; j < M[0].length; j++)
        {
            data[i][j] = M[i][j] * k; 
        }
    }
    return M;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function matrix_add(M1, M2)
{
    if (M1.length != M2.length && M1[0].length != M2[0].length)
    {
        console.log("Matrix sizes need too match");
        return null;
    }

    var data = [];
    for (let i = 0; i < M1.length; i++)
    {   
        data.push([])
        for (let j = 0; j < M1[0].length; j++)
        {
            data[i][j] = M1[i][j] + M2[i][j];
        }
    }

    return data;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function invert_2x2(M)
{
    var det = 1/(M[0][0]*M[1][1]-M[0][1]*M[1][0]);
    var newMat = [[M[1][1]*det,-M[0][1]*det],
                  [-M[1][0]*det, M[0][0]*det]];
    return newMat;
}