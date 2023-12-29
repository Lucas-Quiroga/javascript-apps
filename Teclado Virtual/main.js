// Definición de las teclas en un arreglo bidimensional.
const keys = [
  [
    ["1", "!"],
    ["2", "@"],
    ["3", "#"],
    ["4", "$"],
    ["5", "%"],
    ["6", "&"],
    ["7", "/"],
    ["8", "("],
    ["9", ")"],
    ["0", "="],
    ["'", "?"],
    ["¿", "¡"],
  ],
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
  ],
  [
    ["MAYUS", "MAYUS"],
    ["a", "A"],
    ["s", "S"],
    ["d", "D"],
    ["f", "F"],
    ["g", "G"],
    ["h", "H"],
    ["j", "J"],
    ["k", "K"],
    ["l", "L"],
  ],
  [
    ["SHIFT", "SHIFT"],
    ["z", "Z"],
    ["x", "X"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
  ],
  [["SPACE", "SPACE"]],
];

// Estados de las teclas especiales.
let mayus = false;
let shift = false;
let current = null;

// Función para renderizar el teclado en el DOM.
function renderKeyboard() {
  const keyboard = document.querySelector("#keyboard-container");
  let empty = `<div class="key-empty"></div>`;

  // Genera el HTML para cada capa del teclado.
  const layers = keys.map((layer) => {
    return layer.map((key) => {
      // Manejo especial para teclas SHIFT, MAYUS y SPACE.
      if (key[0] === "SHIFT") {
        return `<button class="key key-shift ${shift ? "activated" : ""}">${
          key[0]
        }</button>`;
      }
      if (key[0] === "MAYUS") {
        return `<button class="key key-mayus ${mayus ? "activated" : ""}">${
          key[0]
        }</button>`;
      }
      if (key[0] === "SPACE") {
        return `<button class="key key-space"></button>`;
      }
      // Para otras teclas normales.
      return `<button class="key key-normal">${
        shift
          ? key[1]
          : mayus &&
            key[0].toLocaleLowerCase().charCodeAt(0) >= 97 &&
            key[0].toLocaleLowerCase().charCodeAt(0) <= 122
          ? key[1]
          : key[0]
      }</button>`; // Corregir aquí
    });
  });

  // Añade una tecla vacía al final de la primera capa y al principio de la segunda.
  layers[0].push(empty);
  layers[1].unshift(empty);

  // Combina las capas generadas en un solo HTML.
  const htmlLayers = layers.map((layer) => {
    return layer.join("");
  });

  keyboard.innerHTML = "";

  htmlLayers.forEach((layer) => {
    keyboard.innerHTML += `<div class="layer">${layer}</div>`;
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", (e) => {
      if (current) {
        // Maneja acciones según la tecla presionada.
        if (key.textContent === "SHIFT") {
          shift = !shift;
        } else if (key.textContent === "MAYUS") {
          mayus = !mayus;
        } else if (key.textContent === "") {
          current.value += " ";
        } else {
          current.value += key.textContent.trim();
          if (shift) {
            shift = false;
          }
        }
        renderKeyboard();
        current.focus();
      }
    });
  });
}

// Asigna eventos de foco a los inputs para rastrear el elemento actual.
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focusin", (e) => {
    current = e.target;
  });
});

// Inicializa la renderización del teclado.
renderKeyboard();
