import { addTask, countPendingTasks, removeTask, toggleTask } from "./task.js";
import { loadTasks, saveTasks } from "./storage.js";
import {
  clearError,
  createUIRefs,
  renderTasks,
  showError,
  updatePendingCount,
} from "./ui.js";

const ui = createUIRefs();
let tasks = loadTasks();

function renderApp() {
  renderTasks(ui.list, tasks);
  updatePendingCount(ui.pendingCount, countPendingTasks(tasks));
}

function persistAndRender() {
  saveTasks(tasks);
  renderApp();
}

ui.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = ui.input.value.trim();
  if (!taskText) {
    showError(ui.errorMessage, "No se puede agregar una tarea vacia.");
    return;
  }

  clearError(ui.errorMessage);
  tasks = addTask(tasks, taskText);
  persistAndRender();
  ui.input.value = "";
  ui.input.focus();
});

ui.input.addEventListener("input", () => {
  if (ui.errorMessage.textContent) {
    clearError(ui.errorMessage);
  }
});

ui.list.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[type='checkbox'][data-task-id]");
  if (!checkbox) {
    return;
  }

  tasks = toggleTask(tasks, checkbox.dataset.taskId);
  persistAndRender();
});

ui.list.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("button.delete-btn[data-task-id]");
  if (!deleteButton) {
    return;
  }

  tasks = removeTask(tasks, deleteButton.dataset.taskId);
  persistAndRender();
});

renderApp();
