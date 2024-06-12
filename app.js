function GameBoard() {
    //initial board state
    const board = [["", "", ""],
                   ["", "", ""],
                   ["", "", ""]]
    
    //logs board state to console
    const printBoard = () => {
        console.log(board.map(row => row.join(" | ")).join("\n---------\n"))
    }

    //if cell is unmarked, marks game board cell with player's token
    const markCell = (row, col, token) => {
        if(board[row - 1][col - 1] == ""){
            board[row - 1][col - 1] = token
        }
        else{
            console.log('Cell is already occupied, please choose another')
            game.switchPlayerTurn()
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

    return {printBoard, markCell, resetBoard}
}

function GameController() {
    const board = GameBoard()

    const players = [
        {
            name: 'player One',
            token: 'X'
        },
        {
            name: 'player Two',
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
        board.printBoard()
        console.log(`${activePlayer.name}'s turn`)
    }

    //marks empty cell with activePlayer's token
    const playRound = (row, col) => {
        board.markCell(row, col, activePlayer.token)

        //handle win conditions

        //switch active player and print board state
        switchPlayerTurn()
        printNewRound()
    }

    //initial game state
    printNewRound()

    return {playRound, switchPlayerTurn}
}

const game = GameController()