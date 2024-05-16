const message = document.querySelector(".messages");
let activePlayer;
let players;
let board;
let turnCount;
let divBoard;
const switchPlayerTurn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];
};

const initializeGLobalVars = () => {
  players = [];
  board = ["", "", "", "", "", "", "", "", ""];
  turnCount = 0;
  divBoard = [];
};

const UI = () => {
  const startGameButton = document.getElementById("startGame");
  const start = document.getElementById("start");
  const userInfo = document.getElementById("userInfo");
  const gameGrid = document.querySelector(".gameGrid");

  startGameButton.addEventListener("click", () => {
    userInfo.showModal();
    start.addEventListener("click", startGame);
  });
  const startGame = (event) => {
    event.preventDefault();
    initializeGLobalVars();
    const { playRound, assignmarks, createPlayers, initializePlayer } =
      GameController();

    gameGrid.innerHTML = "";

    const userName = document.getElementById("name-input").value;
    const userMark = document.querySelector(
      'input[name="userMark"]:checked'
    ).value;
    userInfo.close();
    assignmarks(userMark);
    createPlayers(userName, userMark);
    initializePlayer(userMark);
    showGame(divBoard, userName, userMark);
    playRound();
  };

  const showGame = () => {
    for (i = 0; i < 9; i++) {
      const div = document.createElement("div");
      divBoard.push(div);
      div.id = i;
      gameGrid.appendChild(div);
      div.addEventListener("click", userPlayTurn);
    }
  };

  const userPlayTurn = (event) => {
    const { updateBoard, checkWin } = Gameboard();
    const { playRound } = GameController();

    if (event.target.textContent === "" && activePlayer.name !== "Computer") {
      let userChoiceIndex = event.target.id;
      updateBoard(userChoiceIndex, activePlayer.mark);
      turnCount++;
      if (checkWin()) {
        message.textContent = `${activePlayer.name} wins!`;
        endGame();
        return;
      }
      if (turnCount >= 9) {
        message.textContent = "Game is even!";
        endGame();
        return;
      }
      switchPlayerTurn();
      playRound();
    } else {
      message.textContent = "Already taken. Please choose another cell";
    }
  };

  const endGame = () => {
    divBoard.forEach((div) => {
      div.removeEventListener("click", userPlayTurn);
    });
  };
  return { endGame };
};

function Gameboard() {
  const updateBoard = (cell, mark) => {
    board[cell] = mark;
    divBoard[cell].textContent = mark;
  };

  const checkWin = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i * 3] !== "" &&
        board[i * 3] === board[i * 3 + 1] &&
        board[i * 3 + 1] === board[i * 3 + 2]
      ) {
        return board[i * 3];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        board[i] !== "" &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        return board[i];
      }
    }

    if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
      return board[0];
    }
    if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }

    return null;
  };

  return { updateBoard, checkWin };
}

function GameController() {
  const { updateBoard, checkWin } = Gameboard();

  let computerMark;

  let assignmarks = (playerMark) => {
    computerMark = playerMark === "X" ? "O" : "X";
  };

  let createPlayers = (playerName, playerMark) => {
    players = [
      { name: playerName, mark: playerMark },
      { name: "Computer", mark: computerMark },
    ];
  };

  let initializePlayer = (playerMark) => {
    activePlayer = playerMark === "X" ? players[0] : players[1];
  };

  const computerTurn = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 9);
    } while (board[randomIndex] !== "");
    updateBoard(randomIndex, activePlayer.mark);
    turnCount++;
    if (checkWin()) {
      message.textContent = `${activePlayer.name} wins!`;
      uiInstance.endGame();
      return;
    }
    if (turnCount >= 9) {
      message.textContent = "Game is even!";
      uiInstance.endGame();
      return;
    }
    switchPlayerTurn();
    playRound();
  };

  const playRound = () => {
    if (activePlayer.name === "Computer") {
      message.textContent = "Computer's turn.";
      computerTurn();
    } else {
      message.textContent = "Your turn, pick a cell.";
    }
  };

  return {
    playRound,
    createPlayers,
    initializePlayer,
    assignmarks,
  };
}

const uiInstance = UI();
