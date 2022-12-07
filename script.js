const overlay = document.getElementById("winningMessage");
const winMsg = document.querySelector("[data-winning-message-text]");
const rBtn = document.getElementById("restartButton");
const board = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".cell"));
const winConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];
let xTurn;
let player = "circle";
let clicked;

window.addEventListener("load", startGame);
function startGame() {
   xTurn = true;
   clicked = 0;
   boardHoverEffect();
}

cells.forEach((c) => {
   c.addEventListener("click", clickCell);
});

function clickCell() {
   if (this.classList.contains("x") || this.classList.contains("circle"))
      return;
   clicked++;
   xTurn ? this.classList.add("x") : this.classList.add("circle");
   switchTurns();
   switchPlayer();
   boardHoverEffect();
   if (wining(true)) {
      overlay.classList.add("show");
      player == "x"
         ? (winMsg.textContent = `X wins`)
         : (winMsg.textContent = `O wins`);
   } else if (clicked == 9) {
      overlay.classList.add("show");
      winMsg.textContent = `IT'S A DRAW!`;
   }
}
function boardHoverEffect() {
   board.classList.remove("x", "circle");
   xTurn ? board.classList.add("x") : board.classList.add("circle");
}

function switchTurns() {
   xTurn = !xTurn;
}
function switchPlayer() {
   xTurn ? (player = "circle") : (player = "x");
}

function wining() {
   return winConditions.some((s) => {
      return s.every((e) => {
         return cells[e].classList.contains(player);
      });
   });
}

rBtn.addEventListener("click", () => {
   overlay.classList.remove("show");
   cells.forEach((c) => {
      c.className = "cell";
   });
   startGame();
});
