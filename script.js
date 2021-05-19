// HTML elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const allCellDiv = document.querySelectorAll('.game-cell');

// game constant

const xSymbol = '×';
const oSymbol = '○';


// game variables
let gameIsLive = true;
let xIsNext = true;


// fun letter to symbol
const letterToSymbol =(letter) => letter === 'x'? xSymbol : oSymbol; 

// function that handled win
const handledWin = (letter) => {
    gameIsLive = false;
    if(letter === 'x'){
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
    }else{ 
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won! </span>`;
    }
}

// game status
const checkGameStatus = () => {
    const topLeft = allCellDiv[0].classList[1];
    const topMiddle = allCellDiv[1].classList[1];
    const topRight = allCellDiv[2].classList[1];
    const middleLeft = allCellDiv[3].classList[1];
    const middleMiddle = allCellDiv[4].classList[1];
    const middleRight = allCellDiv[5].classList[1];
    const bottomLeft = allCellDiv[6].classList[1];
    const bottomMiddle = allCellDiv[7].classList[1];
    const bottomRight = allCellDiv[8].classList[1];

    // console.log(topLeft, topMiddle, topRight,middleLeft,middleMiddle,middleRight,
    //     bottomLeft, bottomMiddle, bottomRight);

    // is there a winner?
    if(topLeft && topLeft === topMiddle && topLeft === topRight){
        handledWin(topLeft);

    }else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
        handledWin(topLeft);
        allCellDiv[0].classList.add('won');
        allCellDiv[3].classList.add('won');
        allCellDiv[6].classList.add('won');
    }else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
        handledWin(topLeft);
        allCellDiv[0].classList.add('won');
        allCellDiv[4].classList.add('won');
        allCellDiv[8].classList.add('won');
    }else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handledWin(topMiddle);
        allCellDiv[1].classList.add('won');
        allCellDiv[4].classList.add('won');
        allCellDiv[7].classList.add('won');
    }else if(topRight && topRight === middleRight && topRight === bottomRight){
        handledWin(topRight);
        allCellDiv[2].classList.add('won');
        allCellDiv[5].classList.add('won');
        allCellDiv[8].classList.add('won');
    }else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handledWin(middleLeft);
        allCellDiv[3].classList.add('won');
        allCellDiv[4].classList.add('won');
        allCellDiv[5].classList.add('won');
    }else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handledWin(bottomLeft);
    }else if(bottomLeft && bottomLeft === middleMiddle && bottomLeft === topRight){
        handledWin(bottomLeft);
        allCellDiv[6].classList.add('won');
        allCellDiv[4].classList.add('won');
        allCellDiv[2].classList.add('won');
    }else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && 
            bottomLeft && bottomMiddle && bottomRight){
                gameIsLive = false;
                statusDiv.innerHTML = 'Game is tied!';

    }else {
        xIsNext = !xIsNext;
        if(xIsNext){
            statusDiv.innerHTML = `${xSymbol} is next`;
        }else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
            // xIsNext=true;

        }
    }
}



// event Handler

const handleReset = (e) => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    allCellDiv.forEach( (cell)=>{
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('won');
    } );
    gameIsLive = true;

}

const handleCellClick = (cell) => {
    console.log(cell);
    const classList = cell.target.classList;
    // console.log(classList);

    if(!gameIsLive || classList[1] == 'x' || classList[1] == 'o'){
        return;
    }
    if(xIsNext){
        classList.add('x');
        checkGameStatus();
    }else{
        classList.add('o');
        checkGameStatus();
    }
    // console.log(classList);
    // console.log(allCellDiv);
}


// event listener

resetDiv.addEventListener('click', handleReset )

allCellDiv.forEach( (celDiv) => {
    celDiv.addEventListener('click', handleCellClick)
})