// Definición del tablero
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// Variable para rastrear el turno (0 = usuario, 1 = PC)
let turn = 0;

// Obtener referencias a elementos del DOM
const boardContainer = document.querySelector("#board");
const playerDiv = document.querySelector("#player");

// Función para iniciar el juego
function startGame() {
  renderBoard();
  // Determinar aleatoriamente el turno inicial
  turn = Math.random() <= 0.5 ? 0 : 1;
  renderCurrentPlayer();

  // Iniciar el primer turno según el jugador
  if (turn === 0) {
    playerPlays();
  } else {
    PCPlays();
  }
}

// Función para manejar el turno del jugador
function playerPlays() {
  const cells = document.querySelectorAll(".cell");

  // Asignar un manejador de eventos a cada celda
  cells.forEach((cell, i) => {
    const column = i % 3;
    const row = parseInt(i / 3);

    // Verificar si la celda está vacía antes de agregar el manejador de eventos
    if (board[row][column] === "") {
      cell.addEventListener("click", (e) => {
        // Marcar la celda con "O" y actualizar la interfaz
        board[row][column] = "O";
        cell.textContent = board[row][column];

        // Cambiar al turno de la PC y verificar el resultado
        turn = 1;
        const won = checkIfWinner();

        // Realizar acciones según el resultado del juego
        if (won === "none") {
          PCPlays();
          return;
        }

        if (won === "draw") {
          renderDraw();
          // Eliminar el manejador de eventos después de un empate
          cells.forEach((cell) => {
            cell.removeEventListener("click", this);
          });
          return;
        }
      });
    }
  });
}

// Función para manejar el turno de la PC
function PCPlays() {
  renderCurrentPlayer();
  setTimeout(() => {
    let played = false;
    const options = checkIfCanWin();

    // Verificar si la PC puede ganar en el próximo movimiento
    if (options.length > 0) {
      const bestOptions = options[0];
      for (let i = 0; i < bestOptions.length; i++) {
        if (bestOptions[i].value === 0) {
          const posI = bestOptions[i].i;
          const posJ = bestOptions[i].j;
          // Marcar la celda con "X"
          board[posI][posJ] = "X";
          played = true;
          break;
        }
      }
    } else {
      // Si no puede ganar, realizar un movimiento aleatorio
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === "" && !played) {
            board[i][j] = "X";
            played = true;
          }
        }
      }
    }

    // Cambiar al turno del jugador y verificar el resultado
    turn = 0;
    renderBoard();
    renderCurrentPlayer();
    const won = checkIfWinner();

    // Realizar acciones según el resultado del juego
    if (won === "none") {
      playerPlays();
      return;
    }

    if (won === "draw") {
      renderDraw();
      return;
    }
  }, 1500);
}

// Función para renderizar el mensaje de empate
function renderDraw() {
  playerDiv.textContent = "Draw";
}

// Función para verificar si la PC puede ganar en el próximo movimiento
function checkIfCanWin() {
  const arr = JSON.parse(JSON.stringify(board));

  // Asignar valores a las celdas para evaluar movimientos posibles
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === "X") {
        arr[i][j] = { value: 1, i, j };
      }
      if (arr[i][j] === "") {
        arr[i][j] = { value: 0, i, j };
      }
      if (arr[i][j] === "O") {
        arr[i][j] = { value: -2, i, j };
      }
    }
  }

  // Definir posiciones y líneas del tablero
  const p1 = arr[0][0];
  const p2 = arr[0][1];
  const p3 = arr[0][2];
  const p4 = arr[1][0];
  const p5 = arr[1][1];
  const p6 = arr[1][2];
  const p7 = arr[2][0];
  const p8 = arr[2][1];
  const p9 = arr[2][2];

  const s1 = [p1, p2, p3];
  const s2 = [p4, p5, p6];
  const s3 = [p7, p8, p9];
  const s4 = [p1, p4, p7];
  const s5 = [p2, p5, p8];
  const s6 = [p3, p6, p9];
  const s7 = [p1, p5, p9];
  const s8 = [p3, p5, p7];

  // Filtrar líneas que pueden ganar
  const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter((line) => {
    return (
      line[0].value + line[1].value + line[2].value === 2 ||
      line[0].value + line[1].value + line[2].value === -4
    );
  });

  return res;
}

// Función para verificar el resultado del juego
function checkIfWinner() {
  const p1 = board[0][0];
  const p2 = board[0][1];
  const p3 = board[0][2];
  const p4 = board[1][0];
  const p5 = board[1][1];
  const p6 = board[1][2];
  const p7 = board[2][0];
  const p8 = board[2][1];
  const p9 = board[2][2];

  const s1 = [p1, p2, p3];
  const s2 = [p4, p5, p6];
  const s3 = [p7, p8, p9];
  const s4 = [p1, p4, p7];
  const s5 = [p2, p5, p8];
  const s6 = [p3, p6, p9];
  const s7 = [p1, p5, p9];
  const s8 = [p3, p5, p7];

  // Filtrar líneas que representan una victoria
  const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter((line) => {
    return (
      line[0][0] + line[0][1] + line[0][2] === "XXX" ||
      line[0][0] + line[0][1] + line[0][2] === "OOO"
    );
  });

  // Determinar el resultado del juego y mostrar el mensaje correspondiente
  if (res.length > 0) {
    if (res[0][0] === "X") {
      playerDiv.textContent = "PC WINS";
      return "pcwon";
    } else {
      playerDiv.textContent = "USER WINS";
      return "userwon";
    }
  } else {
    // Verificar si hay un empate
    let draw = true;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          draw = false;
        }
      }
    }
    return draw ? "draw" : "none";
  }
}

// Función para renderizar el turno actual del jugador
function renderCurrentPlayer() {
  playerDiv.textContent = `${turn === 0 ? "Player turn" : "PC turn"}`;
}

// Función para renderizar el tablero en el DOM
function renderBoard() {
  const html = board.map((row) => {
    const cells = row.map((cell) => {
      return `<button class="cell">${cell}</button>`;
    });
    return `<div class="row">${cells.join("")}</div>`;
  });

  boardContainer.innerHTML = html.join("");
}

// Iniciar el juego al cargar la página
startGame();
