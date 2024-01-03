// Array para almacenar las etiquetas
let tags = [];

// Elementos del DOM
const inputTagContainer = document.querySelector("#input-tag");
const tagsContainer = document.createElement("div");
const inputTag = document.createElement("span");

// Configuración del elemento de entrada de tags
inputTag.ariaRoleDescription = "textbox";
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

// Agregamos clases a los contenedores
inputTagContainer.classList.add("input-tag-container");
tagsContainer.classList.add("tag-container");

// Estructura del DOM
inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

// Manejador de eventos para enfocar el input al hacer clic en el contenedor
inputTagContainer.addEventListener("click", (e) => {
  if (
    e.target.id === "input-tag" ||
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus();
  }
});

// Manejador de eventos para el input de tags
inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTag.textContent !== "") {
    e.preventDefault();
    if (!existTag(inputTag.textContent)) {
      tags.push(inputTag.textContent);
      inputTag.textContent = "";
      renderTags();
    }
  } else if (
    e.key === "Backspace" &&
    inputTag.textContent === "" &&
    tags.length > 0
  ) {
    tags.pop();
    renderTags();
  }
});

// Función para renderizar las etiquetas
function renderTags() {
  tagsContainer.innerHTML = "";
  const html = tags.map((tag) => {
    const tagElement = document.createElement("div");
    const tagButton = document.createElement("button");

    // Configuración de estilos y estructura de las etiquetas
    tagElement.classList.add("tag-item");
    tagButton.textContent = "X";
    tagButton.addEventListener("click", (e) => {
      // Manejador para eliminar la etiqueta
      removeTag(tag);
    });
    tagElement.appendChild(document.createTextNode(tag));
    tagElement.appendChild(tagButton);
    return tagElement;
  });

  // Agregamos las etiquetas renderizadas al contenedor
  html.forEach((element) => {
    tagsContainer.appendChild(element);
  });
  tagsContainer.appendChild(inputTag);
  inputTag.focus();
}

// Función para verificar si una etiqueta ya existe
function existTag(value) {
  return tags.includes(value);
}

// Función para eliminar una etiqueta
function removeTag(value) {
  tags = tags.filter((tag) => tag !== value);
  renderTags();
}
