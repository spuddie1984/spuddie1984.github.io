// This game works as per the requirements but there could be some improvements to the game logic
// As the focus was on the project, not the homework assignment i decided to leave as is for now

///////////////////////////////////////////////////////////
////////////////////////// SETUP //////////////////////////
///////////////////////////////////////////////////////////

// lets grab all the game squares
const gameLogic = document.querySelectorAll(".single-sector");

// for game logic so we can check who is winning :)
let gameArray = ["","","","","","","","",""];

// need to put this here so that its available in the else if statment as well
// Why ??????
// If we declare it in the callback event function, after that function is executed we will lose 
// the variable that was stored
let previousTime;

// This is so that X can't be changed after it has entered the game tile(after 1 second)
// to stop X cheating ;)
const PLAYERTURNINTERVAL = 1000;

// remember function expressions are not hoisted
// this function has to go above the event listener for loop
const ticTacToeChecker = (event) => {
    // check tile if doesnt have content then write X
    if (event.target.innerHTML.length === 0) {
        // sector is empty lets write a X to it
        event.target.innerHTML = "X";

        // this is for comparing each event click
        previousTime = event.timeStamp;
        event.target.style.color = "red";

        // store the innerHTML value in an array for the game logic later
        // Use the data attribute to put it in the right position in the array
        gameArray[parseInt(event.target.dataset.sector) - 1] = event.target.innerHTML;

        // compare the current event timestamp with the previously saved one
        // this is to stop players cheating once the sector has a value after one 
        // second it cant be altered
    } else if (event.timeStamp - previousTime < PLAYERTURNINTERVAL) {
        // ok so it passed the test 
        event.target.innerHTML = "O";
        event.target.style.color = "black";

        // same as above
        gameArray[parseInt(event.target.dataset.sector) - 1] = event.target.innerHTML;
    }
}

// loop through each sector and attach an event listener to each one
for (let prop of gameLogic) {
    prop.addEventListener("click", ticTacToeChecker);
}

///////////////////////////////////////////////////////////////
////////////////// GAME LOGIC /////////////////////////////////
///////////////////////////////////////////////////////////////

// check for a horizontal 3 in a row X or O
const horizontalChecker = (array) => {
    for (let sector = 0; sector < array.length - 1; sector += 3) {
        // check to see if the horizontal sector has a X or a O if so run playerWon func
        if (array[sector] === "X" && array[sector + 1] === "X" && array[sector + 2] === "X") {
            playerWon("X");
        } else if (array[sector] === "O" && array[sector + 1] === "O" && array[sector + 2] === "O") {
            playerWon("O")
        }
    }
}

// check for a horizontal 3 in a row X or O 
const verticalChecker = (array) => {
    for (let sector = 0; sector < 3; sector++) {
        // check to see if the vertical sector has a X or a O if so run playerWon func
        if (array[sector] === "X" && array[sector + 3] === "X" && array[sector + 6] === "X") {
            playerWon("X");
        } else if (array[sector] === "O" && array[sector + 3] === "O" && array[sector + 6] === "O") {
            playerWon("O");
        }
    }
}

// check for diagonal 3 in a row X or O
const diagonalChecker = (array) => {
    // check to see if the left diagonal sector has a X or a O if so run playerWon func
    if (array[0] === "X" && array[4] === "X" && array[8] === "X") {
        playerWon("X");
    } else if (array[0] === "O" && array[4] === "O" && array[8] === "O") {
        playerWon("O");
    }
    
    // check to see if the right diagonal sector has a X or a O if so run playerWon func
    if (array[2] === "X" && array[4] === "X" && array[6] === "X") {
        playerWon("X");
    } else if (array[2] === "O" && array[4] === "O" && array[6] === "O") {
        playerWon("O");
    }
}

////////////////////////////////////////////////////////////////////
/////////////// CHECK FOR WINNING GAME AND RESET ///////////////////
////////////////////////////////////////////////////////////////////

// check for winning condition every 2 seconds
setInterval(() => {

    horizontalChecker(gameArray);
    verticalChecker(gameArray);
    diagonalChecker(gameArray);
    catsGameChecker(gameArray);

}, 2000);

const catsGameChecker = (array) => {
    // check for cats game. In other words --> NO ONE WINS
    const catsGame = array.join("");
    if(catsGame.length === 9){
        playerWon("No one", true);
    }
    
}

// show a message of who has won, if no one won show a different message
// after message reset the game
const playerWon = (player, hasCatsGame = false) => {
    
    if(!hasCatsGame){
        alert("Player " + player + " has won!!!");
    }else if(hasCatsGame){
        alert("Cats Game, Check out the console for a description of the meaning of Cats Game!!!");
        console.log("https://english.stackexchange.com/questions/155621/why-is-a-tie-in-tic-tac-toe-called-a-cats-game");
    }
    
    // reset the gameArray for the next game
    gameArray = ["", "", "", "", "", "", "", "", ""];
    
    // reset the game tiles so have no content
    for (let prop of gameLogic) {
        prop.innerHTML = "";
    }
}

////////////////////// THE END ;) ////////////////////////////