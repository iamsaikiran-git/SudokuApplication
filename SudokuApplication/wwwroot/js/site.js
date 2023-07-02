// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let currentSudokuBoard; // Define a global variable

let initialBoard;

function initializeModel(data)
{
    currentSudokuBoard = data; // Assign the serialized model to the global variable
    initialBoard = copyArray(data);
}

function onTextChanged(id, value)
{
    let indexArr = String(id).split(",")
    let row = Number(indexArr[0])
    let column = Number(indexArr[1])
    let updatedValue = Number(value)
    if (value != "" && updatedValue >= 1 && updatedValue <= 9) {
        if (!IsValidSudokuPlaceMent(row, column, Number(value), "red")) {
            document.getElementById(id).style.borderColor = "red"
        }
        currentSudokuBoard[row][column] = Number(value);
    }
    else if (updatedValue == "") {
        IsValidSudokuPlaceMent(row, column, currentSudokuBoard[row][column], "black")
        document.getElementById(id).style.borderColor = "black"
        currentSudokuBoard[row][column] = 0;
    }
    else
    {
        document.getElementById(id).value = ""
    }
}

function IsValidSudokuPlaceMent(row, column, newchar,colorToUpdate)
{
    for (let i = 0; i < 9; i++)
    {
        if (i!= column && currentSudokuBoard[row][i] != 0 && currentSudokuBoard[row][i] == newchar)
        {
            let id = String(row) + "," + i
            let box = document.getElementById(String(id));
            box.style.borderColor = colorToUpdate;
            return false;
        }
        if ( i != row && currentSudokuBoard[i][column] != 0 && currentSudokuBoard[i][column] == newchar)
        {
            let id = String(i) + "," + column
            document.getElementById(id).style.borderColor = colorToUpdate;
            return false;
        }
        let r1 = (3 * (Math.floor(row / 3))) + (Math.floor(i / 3))
        let c1 = (3 * (Math.floor(column / 3))) + (i % 3)
        let boxindex = currentSudokuBoard[r1][c1]
        if ((r1 != row && c1 != column) && boxindex != 0 && boxindex == newchar)
        {
            let id = String(r1) + "," + c1
            document.getElementById(id).style.borderColor = colorToUpdate;
            return false;
        }
    }
    return true;
}

function solveSudoku()
{
    currentSudokuBoard = copyArray(initialBoard)
    Sudokusolver(0, 0)
    populateTable(currentSudokuBoard)
}

function resetSucokuBoard()
{
    currentSudokuBoard = copyArray(initialBoard)
    populateTable(currentSudokuBoard)
}

function Sudokusolver(row,column)
{
    if (row == currentSudokuBoard.length)
    {
        return true;
    }
    if (column == currentSudokuBoard.length)
    {
        return Sudokusolver(row + 1, 0);
    }

    if (currentSudokuBoard[row][column] != 0)
    {
        return Sudokusolver(row, column + 1);
    }

    for (let k = 1; k <= 9; k++)
    {
        if (ValidateSudokuPlacement(row, column, k))
        {
            currentSudokuBoard[row][column] = k;
            if (Sudokusolver(row, column + 1))
            {
                return true;
            }
            currentSudokuBoard[row][column] = 0;
        }
    }
    return false;
}

function ValidateSudokuPlacement(row, column, newchar)
{
    for (let i = 0; i < 9 ; i++)
    {
        if (currentSudokuBoard[row][i] == newchar)
            return false;
        if (currentSudokuBoard[i][column] == newchar)
            return false;
        if (currentSudokuBoard[3 * (Math.floor(row / 3)) + (Math.floor(i / 3))][3 * (Math.floor(column / 3)) + i % 3] == newchar)
            return false;
    }
    return true;
}

function copyArray(oldArray) {
    let newArray = []
    for (let i = 0; i < 9; i++) {
        let newAray1 = []
        for (let j = 0; j < 9; j++) {
            newAray1.push(oldArray[i][j])
        }
        newArray.push(newAray1)
    }
    return newArray
}


function populateTable(boardToPopulate)
{
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            let valueToPopulate = ""
            if (boardToPopulate[i][j] > 0)
            {
                valueToPopulate = boardToPopulate[i][j]
            }
            document.getElementById(String(i) + "," + j).value = valueToPopulate;
            document.getElementById(String(i) + "," + j).style.borderColor = "black"
        }
    }
}