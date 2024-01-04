// Inicialización de comentarios
const comments = [];

// Creación de elementos del DOM
const inputContainer = document.createElement("div");
const input = document.createElement("input");
const commentsContainer = document.querySelector("#comments-container");

// Añadiendo clases al input
input.classList.add("input");

// Evento al presionar tecla en el input
input.addEventListener("keydown", (e) => {
  handleEnter(e, null);
});

// Añadiendo elementos al DOM
commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

// Función para manejar la tecla Enter
function handleEnter(e, current) {
  if (e.key === "Enter" && e.target.value !== "") {
    // Creación de un nuevo comentario
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: [],
    };

    // Agregando el comentario al inicio del array de comentarios
    if (current === null) {
      comments.unshift(newComment);
    } else {
      // Agregando el comentario a las respuestas del comentario actual
      current.responses.unshift(newComment);
    }

    // Limpiando el valor del input
    e.target.value = "";

    // Limpiando y renderizando los comentarios
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(inputContainer);
    renderComments(comments, commentsContainer);
  }
}

// Función para renderizar comentarios
function renderComments(arr, parent) {
  arr.forEach((element) => {
    // Creación de elementos del comentario
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");

    const responsesContainer = document.createElement("div");
    responsesContainer.classList.add("responses-container");

    const replyButton = document.createElement("button");
    const likeButton = document.createElement("button");

    const textContainer = document.createElement("div");
    textContainer.textContent = element.text;

    const actionsContainer = document.createElement("div");

    // Configuración de botones
    replyButton.textContent = "Reply";
    likeButton.textContent = `${
      element.likes > 0 ? `${element.likes} likes` : "likes"
    }`;

    // Eventos de botones
    replyButton.addEventListener("click", (e) => {
      // Clonando el input y configurando su evento
      const newInput = input.cloneNode(true);
      newInput.value = "";
      newInput.focus();
      newInput.addEventListener("keydown", (e) => {
        handleEnter(e, element);
      });

      // Insertando el nuevo input antes del contenedor de respuestas
      commentContainer.insertBefore(newInput, responsesContainer);
    });

    likeButton.addEventListener("click", (e) => {
      // Incrementando el contador de likes y actualizando el texto del botón
      element.likes++;
      likeButton.textContent = `${
        element.likes > 0 ? `${element.likes} likes` : "likes"
      }`;
    });

    // Añadiendo elementos al comentario
    commentContainer.appendChild(textContainer);
    commentContainer.appendChild(actionsContainer);
    actionsContainer.appendChild(replyButton);
    actionsContainer.appendChild(likeButton);

    commentContainer.appendChild(responsesContainer);

    if (element.responses.length > 0) {
      // Recursividad para renderizar respuestas
      renderComments(element.responses, responsesContainer);
    }

    // Añadiendo el comentario al contenedor padre
    parent.appendChild(commentContainer);
  });
}
