const board = document.querySelector('.game-board');
const status = document.getElementById('status');
const squares = Array.from(document.querySelectorAll('.square'));
let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWinner = () => {
    for (let [a, b, c] of winPatterns) {
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
};

const handleClick = (event) => {
    const index = event.target.dataset.index;
    if (boardState[index] || checkWinner()) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        status.textContent = `Winner: ${winner}`;
    } else if (!boardState.includes(null)) {
        status.textContent = 'Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Next player: ${currentPlayer}`;
    }
};

const resetGame = () => {
    boardState = Array(9).fill(null);
    squares.forEach(square => square.textContent = '');
    currentPlayer = 'X';
    status.textContent = `Next player: ${currentPlayer}`;
};

board.addEventListener('click', handleClick);
status.addEventListener('click', resetGame);
