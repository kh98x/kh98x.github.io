let xTeam = 0;
let oTeam = 0;
let gameButton = document.querySelector("#gameButton");
let gameOver = false;
let total = document.querySelector("input[type='number']");
let winnerClass = document.getElementById("message");
let lastWinner = "";
let arr = [];

total.addEventListener("change", function() {
  oTeam = 0;
  xTeam = 0;
  arr = [];
  document.getElementById("xScore").innerText = xTeam;
  document.getElementById("oScore").innerText = oTeam;
  gameOver = false;
  lastWinner = "X";
  startGame();
  gameButton.nextSibling.remove();
});

function startGame() {
  for (var i = 1; i <= 9; i++) {
    clearBox(i);
  }
  arr = [];
  winnerClass.classList.remove("winner");
  document.turn = lastWinner || "X";
  document.winner = null;
  gameButton.style.display = "inline";
  setMessage(document.turn + " goes first.");
  gameButton.textContent = "Restart";
}

function setMessage(msg) {
  document.getElementById("message").innerText = msg;
}

function nextMove(square) {
  if (document.winner) {
    setMessage(document.turn + " already won.");
  } else if (square.innerText === "") {
    square.innerText = document.turn;
    switchTurn();
  } else {
    checkForTie();
  }
}

function switchTurn() {
  if (checkForWinner(document.turn)) {
    setMessage("Congratulations " + document.turn + ", you won!");
    document.winner = document.turn;
    gameButton.textContent = "Play Again?";
    lastWinner = document.winner;
    if (document.winner === "X") {
      ++xTeam;
      document.getElementById("xScore").innerText = xTeam;
      if (xTeam === Number(total.value)) endGame();
    } else {
      ++oTeam;
      document.getElementById("oScore").innerText = oTeam;
      if (oTeam === Number(total.value)) endGame();
    }
  } else {
    if (document.turn === "X") {
      document.turn = "O";
      setMessage("It’s " + document.turn + "’s turn.");
    } else {
      document.turn = "X";
      setMessage("It's " + document.turn + "'s turn.");
    }
  }
}

function checkForWinner(move) {
  var result = false;
  if (
    checkRow(1, 2, 3, move) ||
    checkRow(4, 5, 6, move) ||
    checkRow(7, 8, 9, move) ||
    checkRow(1, 5, 9, move) ||
    checkRow(1, 4, 7, move) ||
    checkRow(2, 5, 8, move) ||
    checkRow(3, 5, 7, move) ||
    checkRow(3, 6, 9, move)
  ) {
    result = true;
  }
  return result;
}

function checkRow(a, b, c, move) {
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
}

function getBox(number) {
  return document.getElementById("s" + number).innerText;
}

function clearBox(number) {
  document.getElementById("s" + number).innerText = "";
}

function endGame() {
  gameOver = true;
  resetGame();
}

function resetGame() {
  winnerClass.classList.add("winner");
  setMessage("WHOA " + document.turn + " YOU WON THE SERIES!");
  gameButton.style.display = "none";
  let newButton = document.createElement("button");
  newButton.textContent = "Reset Game?";
  gameButton.parentNode.insertBefore(newButton, gameButton.nextSibling);
  newButton.setAttribute("class", "tButton");
  newButton.addEventListener("click", function() {
    oTeam = 0;
    xTeam = 0;
    document.getElementById("xScore").innerText = xTeam;
    document.getElementById("oScore").innerText = oTeam;
    gameOver = false;
    startGame();
    gameButton.style.display = "inline";
    newButton.parentNode.removeChild(newButton);
  });
}

function checkForTie() {
  if (
    9 === totalFilledSquares() &&
    checkForWinner("X") === false &&
    checkForWinner("O") === false
  ) {
    setMessage(`It's a tie, restart the game`);
  } else {
    setMessage("Pick another square");
  }
}

function totalFilledSquares() {
  for (var i = 1; i < 10; i++) {
    if (document.getElementById("s" + i).innerText !== "") {
      arr.push(document.getElementById("s" + i));
    }
  }
  let newArr = [...new Set(arr)];

  return newArr.length;
}
