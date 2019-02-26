var xTeam = 0;
var oTeam = 0;
var gameButton = document.querySelector("#gameButton");
var gameOver = false;
var total = document.querySelector("input[type='number']");

total.addEventListener("change", function() {
  oTeam = 0;
  xTeam = 0;
  document.getElementById("xScore").innerText = xTeam;
  document.getElementById("oScore").innerText = oTeam;
  gameOver = false;
  startGame();
  gameButton.nextSibling.remove();
});

function startGame() {
  for (var i = 1; i <= 9; i++) {
    clearBox(i);
  }
  document.turn = "X";
  document.winner = null;
  gameButton.style.display = "inline";
  setMessage(document.turn + " goes next.");
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
    if (document.winner == "X") {
      ++xTeam;
      document.getElementById("xScore").innerText = xTeam;
      endGame();
    } else {
      ++oTeam;
      document.getElementById("oScore").innerText = oTeam;
      endGame();
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
  if ((oTeam || xTeam) === Number(total.value)) {
    gameOver = true;
    resetGame();
  }
}

function resetGame() {
  setMessage("WHOA " + document.turn + " YOU WON THE SERIES!");
  gameButton.style.display = "none";
  var newButton = document.createElement("button");
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
// create fx to switch starting position
function previousWinner() {
  if (checkForWinner(document.turn) === "X") {
    document.turn = "O";
  } else {
    document.turn = "X";
  }
}

function checkForTie() {
  for (var i = 1; i < 9; i++) {
    if (
      document.getElementById("s" + i).innerText !== "" &&
      checkForWinner("X") === false &&
      checkForWinner("O") === false
    ) {
      setMessage("Sorry it's a tie... Restart the game");
    } else {
      setMessage("Pick another square.");
    }
  }
}
