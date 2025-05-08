const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const endScreen = document.getElementById('endScreen');
const endMessage = document.getElementById('endMessage');
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== '' || !gameActive) return;
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWin()) {
    showEndScreen(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    showEndScreen(`It's a draw!`);
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function showEndScreen(message) {
  endMessage.textContent = message;
  endScreen.style.display = 'flex';
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  endScreen.style.display = 'none';
  createBoard();
}

resetGame();
