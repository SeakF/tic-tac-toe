let number = 0;
let elements = [];

class block {
    constructor(getID, row, col, diag1, diag2) {
        this.row = row;
        this.col = col;
        this.diag1 = diag1;
        this.diag2 = diag2;
        this.myID = "f"+getID;
        this.mark = null;
        this.graphic = function(mark) {
            if (mark != null) document.getElementById(this.myID).innerHTML = `<img src="${mark}.png" alt="">`;
                else document.getElementById(this.myID).innerHTML = "";
        }
    }
}

class GS {
    constructor() {
        this.recentTurn = function(id) {
            document.getElementById("tura").innerHTML = elements[id].mark;
        }
        this.checkWin = function(nr) {
            let rowCheck = 0;
            let colCheck = 0;
            let diag1Check = 0;
            let diag2Check = 0;
            let checkSpace = 0;
            for (i = 0; i < 9; i++)
            {
                if (elements[i].row == elements[nr].row)
                {   
                    if (elements[i].mark == elements[nr].mark) rowCheck++;
                }
                if (elements[i].col == elements[nr].col)
                {
                    if (elements[i].mark == elements[nr].mark) colCheck++;
                }
                if ((i == 0) || (i == 4) || (i == 8))
                {
                    if (elements[i].mark == elements[nr].mark) diag1Check++;
                }
                if ((i == 2) || (i == 4) || (i == 6))
                {
                    if (elements[i].mark == elements[nr].mark) diag2Check++;
                }
            }
            if ((rowCheck == 3) || (colCheck == 3) || (diag1Check == 3) || (diag2Check == 3)) 
            {
                document.getElementById("plate").style.display = "block";
                document.getElementById("plateWinner").innerHTML = elements[nr].mark;
            } else {
                for (i = 0; i < 9; i++)
                {   
                    if (elements[i].mark != null) checkSpace++;
                    if (checkSpace == 9)
                    {
                        document.getElementById("plate").style.display = "block";
                        document.getElementById("plateWinner").innerHTML = "draw";
                    }
                }
            }
        }
        this.setGraphic = function(graphic, element) {
            elements[element].mark = graphic;
            elements[element].graphic(graphic);
        }
    }
}
const gameState = new GS;

function reset() {
    for (i = 0; i < 9; i++)
    {
        elements[i].mark = null;
        elements[i].graphic(null);
    }
    document.getElementById("plate").style.display = "none";
}

function updateBlock(clickedID) {
    if ((elements[clickedID].myID != clickedID) && (elements[clickedID].mark == null))
    {
        if (number%2 == 0) 
        {
            gameState.setGraphic("circle", clickedID)
        } else {
            gameState.setGraphic("cross", clickedID)
        }
        gameState.recentTurn(clickedID);
        gameState.checkWin(clickedID);
        number++;
    }
}

function loadblocks() {
    let row = 0;
    let col = 0;
    let diag1 = 0;
    let diag2 = 0;
    let diagCheck = 0;
    for (i = 0; i < 9; i++)
    {   
        if (i%2 == 0)
        {
            if ((diagCheck%2 == 0) && (diagCheck != 2)) diag1 = 1;
                else if (diagCheck == 2) {
                    diag1 = 1;
                    diag2 = 2;
                } else diag2 = 2;
            diagCheck++;
        }
        elements[i] = new block(i, row, col, diag1, diag2);
        diag1 = 0;
        diag2 = 0;
        if (col == 2) 
        {
            col = 0;
            row++;
        } else col++;
    }
}

window.onload = loadblocks;