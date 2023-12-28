const ratingContainer = document.querySelector(".rating");
let currentValue = 0;
const limit = 7;

// Genera el HTML para los elementos de calificación.
const html = Array.from(Array(limit)).map((_, i) => {
  return `<div class="item item-${i}" data-pos="${i}"></div>`;
});

// Inserta el HTML generado en el contenedor de calificación.
ratingContainer.innerHTML = html.join("");

// Manejo de eventos para los elementos de calificación.
document.querySelectorAll(".item").forEach((item) => {
  // Evento al pasar el mouse sobre un elemento de calificación.
  item.addEventListener("mouseover", (e) => {
    const pos = item.getAttribute("data-pos");

    // Evita repetir la acción si ya se ha seleccionado este valor.
    if (currentValue === parseInt(pos) + 1) {
      return;
    }
    // Reinicia la visualización de los elementos de calificación.
    document.querySelectorAll(".item").forEach((it) => {
      if (it.classList.contains("item-full")) {
        it.classList.remove("item-full");
      }
    });

    // Marca como seleccionados los elementos hasta el valor actual.
    for (let index = 0; index <= pos; index++) {
      const square = document.querySelector(`.item-${index}`);
      if (!square.classList.contains("item-full")) {
        square.classList.add("item-full");
      }
    }
    // Actualiza el valor actual de la calificación.
    currentValue = parseInt(pos) + 1;
  });

  // Evento al hacer clic en un elemento de calificación.
  item.addEventListener("click", (e) => {
    const pos = item.getAttribute("data-pos");
    // Actualiza el valor actual de la calificación y muestra en la consola.
    currentValue = parseInt(pos) + 1;
    console.log(currentValue);
  });
});
