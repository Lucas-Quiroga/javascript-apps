// Declaración de variables para almacenar eventos y fechas.
let events = [];
let arr = [];

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");

// Carga eventos previos almacenados localmente.
const json = loadLocal();
try {
  arr = JSON.parse(json);
} catch (error) {
  arr = [];
}
events = arr ? [...arr] : [];

// Renderiza los eventos existentes al cargar la página.
renderEvents();

// Maneja el evento de envío del formulario y el clic en el botón de añadir evento.
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});

buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addEvent();
});

// Función para añadir un nuevo evento
function addEvent() {
  // Validación: asegura que se ingresen datos válidos.
  if (eventName.value === "" || eventDate === "") {
    return;
  }
  // Validación: asegura que la fecha del evento sea futura.
  if (dateDiff(eventDate.value) < 0) {
    return;
  }
  // Crea un nuevo evento con un ID único
  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
  };

  // Agrega el nuevo evento al principio de la lista.
  events.unshift(newEvent);

  // Guarda la lista actualizada localmente.
  saveLocal(JSON.stringify(events));

  eventName.value = "";

  renderEvents();
}

// Calcula la diferencia de días entre la fecha del evento y la fecha actual.
function dateDiff(date) {
  const targetDate = new Date(date);
  const today = new Date();
  const difference = targetDate.getTime() - today.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}

// Renderiza la lista de eventos en el contenedor.
function renderEvents() {
  const eventsHTML = events.map((event) => {
    return `<div class="event">
        <div class="days">
            <span class="days-number">${dateDiff(event.date)}</span>
            <span class="days-text">días</span>

        </div>
        <div class="event-name">${event.name}</div>
        <div class="event-date">${event.date}</div>
        <div class="actions">
            <button class="bDelete" data-id="${event.id}">Eliminar</button>
        </div>
    </div>`;
  });
  // Actualiza el contenido del contenedor de eventos.
  eventsContainer.innerHTML = eventsHTML.join("");
  // Agrega eventos de clic a los botones de eliminación.
  document.querySelectorAll(".bDelete").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.getAttribute("data-id");
      // Filtra y elimina el evento correspondiente.
      events = events.filter((event) => event.id !== id);
      // Guarda la lista actualizada localmente.
      saveLocal(JSON.stringify(events));
      renderEvents();
    });
  });
}

// Función para guardar datos localmente.
function saveLocal(data) {
  localStorage.setItem("items", data);
}

// Función para cargar datos almacenados localmente.
function loadLocal() {
  return localStorage.getItem("items");
}
