// Tic Tac Toe game logic
// Works with index.html structure: <div class="Box"> <div class="box"></div> x9

const boxes = Array.from(document.querySelectorAll('.box'));
let currentPlayer = 'X';
let gameOver = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function setStatus(text) {
  let status = document.querySelector('#status');
  if (!status) {
    status = document.createElement('div');
    status.id = 'status';
    status.style.marginTop = '16px';
    status.style.color = 'white';
    status.style.textAlign = 'center';
    document.body.appendChild(status);
  }
  status.textContent = text;
}

function handleClick(e) {
  if (gameOver) return;

  const cell = e.currentTarget;

  if (cell.textContent.trim() !== '') return; // already played

  cell.textContent = currentPlayer;

  // Make the symbol size suit the cell (responsive to your CSS cell size)
  cell.style.fontSize = 'clamp(200px, 8vw, 112px)';

  cell.style.fontWeight = '700';
  cell.style.textAlign = 'center';
  cell.style.lineHeight = '1';

  const result = checkWinner();
  if (result) {
    gameOver = true;

    if (result.winner) {
      setStatus(`Player ${result.winner} wins!`);
      highlightCombo(result.combo);
    } else {
      setStatus(`It's a draw!`);
    }
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`Turn: Player ${currentPlayer}`);
}

function highlightCombo(combo) {
  if (!Array.isArray(combo)) return;

  combo.forEach((i) => {
    boxes[i].style.backgroundColor = 'rgba(0, 255, 0, 0.25)';
    boxes[i].style.borderColor = 'rgba(0, 255, 0, 0.6)';
  });
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    const v1 = boxes[a].textContent.trim();
    const v2 = boxes[b].textContent.trim();
    const v3 = boxes[c].textContent.trim();

    if (v1 && v1 === v2 && v2 === v3) {
      return { winner: v1, combo };
    }
  }

  const allFilled = boxes.every((b) => b.textContent.trim() !== '');
  if (allFilled) return { winner: null, combo: null };

  return null;
}

function resetGame() {
  gameOver = false;
  currentPlayer = 'X';
  boxes.forEach((b) => {
    b.textContent = '';
    b.style.backgroundColor = '';
    b.style.borderColor = '';
  });
  setStatus(`Turn: Player ${currentPlayer}`);
}

// Attach listeners
boxes.forEach((cell) => cell.addEventListener('click', handleClick));

// Add a Reset button if not present
(function ensureResetButton() {
  let btn = document.querySelector('#resetBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'resetBtn';
    btn.type = 'button';
    btn.textContent = 'Reset';
    btn.style.display = 'block';
    btn.style.backgroundColor='black';
    btn.style.margin = '16px auto 0';
    btn.style.padding = '10px 16px';
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', resetGame);
    document.body.appendChild(btn);
  }
})();

setStatus(`Turn: Player ${currentPlayer}`);

