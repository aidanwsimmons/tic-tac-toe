function GameBoard() {
    const rows = 3
    const cols = 3
    const board = []

    for(let i = 0; i < rows; i++){
        board[i] = []
        for(let j = 0; j < cols; j++){
            board[i].push(Cell())
        }
    }

    const getBoard = () => board

    const markSquare = (row, col, player) => {

    }

    const printBoard = () => {

    }

    return { getBoard, markSquare, printBoard}
}

const GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = GameBoard()

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ]

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[2]
    }
    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn`)
    }

    const playRound = (row, col) => {
        board.markSquare(row, col, )
    }
}
