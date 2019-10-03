var currentPlayer = "X";
var xScore = 0;
var oScore = 0;
var gameFinished = false;

// all boxes in a list called boxes
var boxes = document.getElementsByTagName('td');

// p element to display whos turn it is
var whosTurn = document.getElementById('whosTurn');
whosTurn.innerText = "X, it's your turn!";

// counter of how many boxes are already filled
var boxesFilled = 0;

// button to play again
var restartButton = document.getElementById('restart');

// p element to display scores
var xScoreCount = document.getElementById("xScores");
var oScoreCount = document.getElementById("oScores");
xScoreCount.innerText = "X has 0 points";
oScoreCount.innerText = "O has 0 points";

// when the 'play again' button is pressed, it calls the reset function
restartButton.addEventListener('click', reset);

// function to reset the board
function reset() {
    currentPlayer = "X";
    whosTurn.innerText = "X, it's your turn!";
    boxesFilled = 0;
    for(i = 0; i < boxes.length; i++) {
        boxes[i].innerText = "";
    }
    gameFinished = false;
}

// loop through the boxes and add eventListeners to them
for(i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', isChecked);
}
function isChecked(boxes) {
    // if the game is not finished, the code below runs, otherwise, nothing happens when you click a box
    if(!gameFinished) {
        // when it's X's turn and the box that the user clicked is empty, the box displays 'X'
        if(currentPlayer === "X" && this.innerText == "") {
            this.innerText = "X";
            currentPlayer = "O";
            whosTurn.innerText = "O, it's your turn!";
            boxesFilled++;
        }
        else if(currentPlayer === "O" && this.innerText == "") {
            this.innerText = "O";
            currentPlayer = "X";
            whosTurn.innerText = "X, it's your turn!";
            boxesFilled++;
        }
        if(boxesFilled > 4) {
            gameFinished = checkWin();
        }
    }
}

// if 3 boxes with index x, y and z have the same character, we have a winner
function match(x, y, z) {
    if(boxes[x].innerText !== "") {
        return boxes[x].innerText === boxes[y].innerText && boxes[y].innerText === boxes[z].innerText;
    }
}
// check if somebody won and dispaly an alert message
function checkWin() {
    if(match(0, 1, 2) || match(3, 4, 5) || match(6, 7, 8) || match(0, 3, 6) || match(1, 4, 7) || match(2, 5, 8) || match(0, 4, 8) || match(2, 4, 6)) {
        // the current player changes before we can check if there is a winner
        // so if the current player is X and we got true from the match function, O is the winner
        if(currentPlayer == "X") {
            oScore++;
            whosTurn.innerText = "Player O won!";
            if(oScore === 1) {
                oScoreCount.innerText = "O has 1 point";
            }
            else {
                oScoreCount.innerText = "O has " + oScore + " points";
            }
            return true;
        }
        else {
            xScore++;
            whosTurn.innerText = "Player X won!";
            if(xScore === 1) {
                xScoreCount.innerText = "X has 1 point";
            }
            else {
                xScoreCount.innerText = "X has " + xScore + " points";
            }
            return true;
        }
    }
    // if all the boxes are filled and no match
    else if(boxesFilled === 9) {
        whosTurn.innerText = "It's a draw!";
        return true;
    }
    return false;
}
