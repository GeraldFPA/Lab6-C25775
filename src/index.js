const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const pendingCount = document.querySelector("#pending-count");
const errorMessage = document.querySelector("#error-message");

function updatePendingCount() {
  const totalTasks = taskList.querySelectorAll(".task-item").length;
  const completedTasks = taskList.querySelectorAll(".task-text.completed").length;
  pendingCount.textContent = String(totalTasks - completedTasks);
}

function clearError() {
  errorMessage.textContent = "";
}

function showError(message) {
  errorMessage.textContent = message;
}

function createTaskElement(taskText) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const leftContainer = document.createElement("div");
  leftContainer.className = "task-left";

  const completeCheckbox = document.createElement("input");
  completeCheckbox.type = "checkbox";
  completeCheckbox.setAttribute("aria-label", "Marcar tarea como completada");

  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = taskText;

  completeCheckbox.addEventListener("change", () => {
    textSpan.classList.toggle("completed", completeCheckbox.checked);
    updatePendingCount();
  });

  leftContainer.appendChild(completeCheckbox);
  leftContainer.appendChild(textSpan);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "Eliminar";

  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    updatePendingCount();
  });

  taskItem.appendChild(leftContainer);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (!taskText) {
    showError("No se puede agregar una tarea vacía.");
    return;
  }

  clearError();
  const taskElement = createTaskElement(taskText);
  taskList.appendChild(taskElement);
  taskInput.value = "";
  taskInput.focus();
  updatePendingCount();
});
