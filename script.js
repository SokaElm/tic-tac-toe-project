function Gameboard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  const showMark = (cell, mark) => {
    board[cell] = mark;
  };

  const checkWin = (board) => {
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

  return { board, showMark, checkWin };
}

function GameController(player, computer) {
  const { board, showMark, checkWin } = Gameboard();

  const players = [
    {
      name: "User",
      mark: "X",
    },
    {
      name: "Computer",
      mark: "O",
    },
  ];

  let activePlayer = "User";

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === "User" ? "Computer" : "User";
  };

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 9);
    return randomIndex;
  };

  const getPlayerChoice = (player) => {
    let cellNumber;
    if (player === "Computer") {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * 9);
      } while (board[randomIndex] !== "");
      return randomIndex;
    } else {
      cellNumber = Number(window.prompt("Choose a cell", ""));
      return cellNumber;
    }
  };

  const playTurn = () => {
    const cellNumber = getPlayerChoice(activePlayer.name);
    showMark(cellNumber, activePlayer.mark);
  };

  let turnCount = 0;

  const playRound = () => {
    while (turnCount < 9) {
      playTurn();
      if (checkWin(board)) {
        console.log(`${checkWin(board) === "X" ? player : computer} wins!`);
        return;
      }
      switchPlayerTurn();
      turnCount++;
    }
    console.log("Game is even!");
  };

  playRound();
}

const game = GameController("User", "Computer");
