// function GameBoard() {
//     const rows = 3
//     const cols = 3
//     const board = []

//     for(let i = 0; i < rows; i++){
//         board[i] = []
//         for(let j = 0; j < cols; j++){
//             board[i].push(Cell())
//         }
//     }

//     const getBoard = () => board

//     const markSquare = (row, col, player) => {

//     }

//     const printBoard = () => {
//         conso
//     }

//     return { getBoard, markSquare, printBoard}
// }

// function Cell() {
//     let value = 0

//     const addToken = (player) => {
//         value = player
//     }

//     const getValue = () => value

//     return {
//         addToken,
//         getValue
//     }
// }

// function GameController(
//     playerOneName = "Player One",
//     playerTwoName = "Player Two"
// ) {
//     const board = GameBoard()

//     const players = [
//         {
//             name: playerOneName,
//             token: 'X'
//         },
//         {
//             name: playerTwoName,
//             token: 'O'
//         }
//     ]

//     let activePlayer = players[0]

//     const switchPlayerTurn = () => {
//         activePlayer = activePlayer === players[0] ? players[1] : players[2]
//     }
//     const getActivePlayer = () => activePlayer

//     const printNewRound = () => {
//         board.printBoard()
//         console.log(`${getActivePlayer().name}'s turn`)
//     }

//     const playRound = (row, col) => {
//         board.markSquare(row, col, getActivePlayer().token)

//         //logic for win/loss/tie

//         switchPlayerTurn()
//         printNewRound()
//     }

//     printNewRound()

//     return {
//         playRound,
//         getActivePlayer,
//         getBoard: board.getBoard
//     }
// }


function GameBoard() {
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
            printBoard()
        }
        else{
            console.log('Cell is already occupied, please choose another')
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

    return {playRound}
}

const game = GameController