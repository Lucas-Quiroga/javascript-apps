const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

// Selección de elementos del DOM
const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

// Inicialización de la aplicación
renderTime();
renderTask();

// Evento para agregar tarea
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTask();
  }
}

// Función para crear una nueva tarea
function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

// Función para renderizar las tareas en el DOM
function renderTask() {
  const html = tasks.map((task) => {
    return `<div class="task">
        <div class="completed">${
          task.completed
            ? `<span class="done">Done</span>`
            : `<button class="start-button" data-id="${task.id}">Start</button>`
        }</div>
        <div class="title">${task.title}</div>
    </div>`;
  });

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button"); // Fix selector
  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("hola");
      if (!timer) {
        const id = button.getAttribute("data-id");
        startButtonsHandler(id);
        button.textContent = "In progress ...";
      }
    });
  });
}

// Función para manejar el inicio de una tarea
function startButtonsHandler(id) {
  time = 5;
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);

  taskName.textContent = tasks[taskIndex].title;

  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

// Función para manejar el temporizador de la tarea
function timerHandler(id) {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTask();
    startBreak();
  }
}

// Función para iniciar el descanso
function startBreak() {
  time = 5;
  taskName.textContent = "Break";
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
}

// Función para manejar el temporizador de descanso

function timerBreakHandler() {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTask();
  }
}

// Función para renderizar el tiempo en el DOM
function renderTime(params) {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

// Función para marcar una tarea como completada
function markCompleted(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true; // Fix the assignment
}
