// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let currentSudokuBoard;

let initialBoard;
let givenSudokus;
let vacantCellsCount = 0;

//Initializes the sudoku application data
function initializeModel(data) {
    givenSudokus = data
    initializeSudokuBoard(0)
}

//resets the sudoku board
function resetSudokuBoard() {
    currentSudokuBoard = copyArray(initialBoard)
    populateTable(currentSudokuBoard)
}

// Initializes the Sudoku Board
function initializeSudokuBoard(selectedBoardIndex) {
    vacantCellsCount = 0
    let tempSelectedSudoku = givenSudokus[selectedBoardIndex]
    currentSudokuBoard = copyArray(tempSelectedSudoku)
    initialBoard = tempSelectedSudoku
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cell = document.getElementById(i + ',' + j)
            let currentCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(currentCell, cell);
            if (tempSelectedSudoku[i][j] == 0) {
                currentCell.disabled = false
                currentCell.value = ""
                currentCell.addEventListener("input", function () {
                    onTextChanged(currentCell.id, currentCell.value)
                })
                vacantCellsCount += 1
            }
            else {
                currentCell.value = tempSelectedSudoku[i][j]
                currentCell.disabled = true
            }
        }
    }
}

// Handles the on text changes event for each cell and upadtes the UI accordingly
function onTextChanged(id, value) {
    let tableCell = String(id).split(",")
    let row = Number(tableCell[0])
    let column = Number(tableCell[1])
    let updatedValue = Number(value)
    if (value != "" && updatedValue >= 1 && updatedValue <= 9) {
        if (!IsValidSudokuPlaceMent(row, column, Number(value), "red")) {
            document.getElementById(id).style.borderColor = "red"
        }
        else {
            vacantCellsCount -= 1
        }
        currentSudokuBoard[row][column] = Number(value);
        if (vacantCellsCount == 0) {
            alert("Congratulations You've solved this sudoku puzzle \n check out other puzzles!!!");
        }
    }
    else {
        IsValidSudokuPlaceMent(row, column, currentSudokuBoard[row][column], "black")
        document.getElementById(id).style.borderColor = "black"
        if (currentSudokuBoard[row][column] > 0 && currentSudokuBoard[row][column] < 10) {
            vacantCellsCount += 1
        }
        currentSudokuBoard[row][column] = 0;
        document.getElementById(id).value = ""
    }
}

// Checks if the current valus user entered is correct and updates the UI Accordingly
function IsValidSudokuPlaceMent(row, column, newchar, colorToUpdate) {
    let result = true;
    for (let i = 0; i < 9; i++) {

        // Check horizontal row
        if (i != column && currentSudokuBoard[row][i] != 0 && currentSudokuBoard[row][i] == newchar) {
            let id = String(row) + "," + i
            let box = document.getElementById(String(id))
            box.style.borderColor = colorToUpdate
            result = false;
        }

        //Checks vertical column
        if (i != row && currentSudokuBoard[i][column] != 0 && currentSudokuBoard[i][column] == newchar) {
            let id = String(i) + "," + column
            document.getElementById(id).style.borderColor = colorToUpdate;
            result = false;
        }

        //Checks the mini matrix
        let r1 = (3 * (Math.floor(row / 3))) + (Math.floor(i / 3))
        let c1 = (3 * (Math.floor(column / 3))) + (i % 3)
        let boxindex = currentSudokuBoard[r1][c1]
        if ((r1 != row && c1 != column) && boxindex != 0 && boxindex == newchar) {
            let id = String(r1) + "," + c1
            document.getElementById(id).style.borderColor = colorToUpdate;
            result = false;
        }
    }
    return result;
}

//Invokes the solve sudoku action
function solveSudoku() {
    currentSudokuBoard = copyArray(initialBoard)
    Sudokusolver(0, 0)
    populateTable(currentSudokuBoard)
}

// Checks the core logic to solve the sudoku puzzle
function Sudokusolver(row, column) {
    if (row == currentSudokuBoard.length) {
        return true;
    }
    if (column == currentSudokuBoard.length) {
        return Sudokusolver(row + 1, 0);
    }

    if (currentSudokuBoard[row][column] != 0) {
        return Sudokusolver(row, column + 1);
    }

    for (let k = 1; k <= 9; k++) {
        if (ValidateSudokuPlacement(row, column, k)) {
            currentSudokuBoard[row][column] = k;
            if (Sudokusolver(row, column + 1)) {
                return true;
            }
            currentSudokuBoard[row][column] = 0;
        }
    }
    return false;
}

// Validates the current sudoku placement for the row and column given
function ValidateSudokuPlacement(row, column, newchar) {
    for (let i = 0; i < 9; i++) {
        if (currentSudokuBoard[row][i] == newchar)
            return false;
        if (currentSudokuBoard[i][column] == newchar)
            return false;
        if (currentSudokuBoard[3 * (Math.floor(row / 3)) + (Math.floor(i / 3))][3 * (Math.floor(column / 3)) + i % 3] == newchar)
            return false;
    }
    return true;
}

// creates the new copy of array
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

// Populates the table with the given board object
function populateTable(boardToPopulate) {
    vacantCellsCount = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let valueToPopulate = ""
            if (boardToPopulate[i][j] > 0) {
                valueToPopulate = boardToPopulate[i][j]
            }
            else {
                vacantCellsCount += 1
            }
            document.getElementById(String(i) + "," + j).value = valueToPopulate;
            document.getElementById(String(i) + "," + j).style.borderColor = "black"
        }
    }
}