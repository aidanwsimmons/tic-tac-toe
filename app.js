function GameBoard() {
    //initial board state
    const board = [["", "", ""],
                   ["", "", ""],
                   ["", "", ""]]

    //if cell is unmarked, marks game board cell with player's token
    const markCell = (row, col, token) => {
        if(board[row - 1][col - 1] == ""){
            board[row - 1][col - 1] = token
            return true
        }
        else{
            return false
        }
    }

    //returns board to original state
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = "";
            }
        }
    }

    const getBoard = () => board

    return {markCell, resetBoard, getBoard}
}

function GameController() {
    const board = GameBoard()

    const players = [
        {
            name: 'player X',
            token: 'X'
        },
        {
            name: 'player O',
            token: 'O'
        }
    ]

    let activePlayer = players[0]

    //changes which player is set to take their turn
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    //prints the board state and instructs the active player to take their turn
    const printNewRound =  () => {
        document.querySelector('.message').textContent = `${activePlayer.name}'s Turn`;
    }

    const checkWin = () => {
        const currentBoard = board.getBoard()

        //checks rows & colums
        for(let i = 0; i < 3; i++){
            if(currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][1] === currentBoard[i][2] && currentBoard[i][0] !== ""){
                return 'win'
            }
            if(currentBoard[0][i] === currentBoard[1][i] && currentBoard[1][i] === currentBoard[2][i] && currentBoard[0][i] !== ""){
                return 'win'
            }
        }

        //checks diagonals
        if(currentBoard[0][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][2] && currentBoard[0][0] !== ""){
            return 'win'
        }
        if(currentBoard[0][2] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][0] && currentBoard[0][2] !== ""){
            return 'win'
        }

        //checks for tie
        if(currentBoard.flat().every(cell => cell !== "")){
            return "tie"
        }

        return "no win"
    }

    //marks empty cell with activePlayer's token
    const playRound = (row, col) => {
        if(board.markCell(row, col, activePlayer.token)){
            let result = checkWin()
            
            if(result === 'win'){
                document.querySelector('.message').textContent = `${activePlayer.name} wins!`
            }
            else if(result === 'tie'){
                document.querySelector('.message').textContent = 'Tie game!'
            }
            else{
                //switch active player and print board state
                switchPlayerTurn()
                printNewRound()
            }
        } else {
            //Cell was occupied, prompt same player again
            printNewRound()
        }
    }

    const newGame = () => {
        board.resetBoard()
        activePlayer = players[0]
        printNewRound()
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }

    const getActivePlayer = () => activePlayer;

    //initial game state
    printNewRound()

    return {playRound, newGame, getActivePlayer, checkWin}
}

const game = GameController();
let gameOver = false;

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        if(gameOver){
            return;
        }
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const token = game.getActivePlayer().token;

        // Check if cell is already marked
        if (e.target.textContent !== '') {
            return; // Exit function if cell already has content
        }

        // Play the round
        game.playRound(row, col);

        // Update the cell content after the round is played
        e.target.textContent = token;

        if (game.checkWin() !== 'no win'){
            gameOver = true
        }
    });
});


document.getElementById('restart').addEventListener('click', () => {
    game.newGame();
});