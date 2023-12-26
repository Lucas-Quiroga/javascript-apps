const inputCard = document.querySelector("#inputCard");
const inputDate = document.querySelector("#inputDate");
const inputCVV = document.querySelector("#inputCVV");

// Definimos máscaras para los diferentes tipos de entrada
const maskNumber = "####-####-####-####";
const maskDate = "##/##";
const maskCVV = "###";

let current = "";
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

inputCard.addEventListener("keydown", (e) => {
  // Si la tecla presionada es "Tab", no hacemos nada y salimos de la función
  if (e.key === "Tab") {
    return;
  }
  e.preventDefault();
  // Llamamos a la función handleInput para manejar la entrada en el input de tarjeta
  handleInput(maskNumber, e.key, cardNumber);
  // Actualizamos el valor del input con la cadena formada a partir del arreglo cardNumber
  inputCard.value = cardNumber.join("");
});

inputDate.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    return;
  }
  e.preventDefault();
  handleInput(maskDate, e.key, dateNumber);
  inputDate.value = dateNumber.join("");
});

inputCVV.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    return;
  }
  e.preventDefault();
  handleInput(maskCVV, e.key, cvvNumber);
  inputCVV.value = cvvNumber.join("");
});

// Función para manejar la entrada en los diferentes inputs
function handleInput(mask, key, arr) {
  // Lista de números permitidos
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  // Si la tecla presionada es "Backspace" y hay elementos en el arreglo, eliminamos el último
  if (key === "Backspace" && arr.length > 0) {
    arr.pop();
    return;
  }
  // Si la tecla presionada es un número y no excede la longitud de la máscara
  if (numbers.includes(key) && arr.length + 1 <= mask.length) {
    // Manejamos la lógica de la máscara (agregamos "-" o "/" según sea necesario)
    if (mask[arr.length] === "-" || mask[arr.length] === "/") {
      arr.push(mask[arr.length], key);
    } else {
      arr.push(key);
    }
  }
}
