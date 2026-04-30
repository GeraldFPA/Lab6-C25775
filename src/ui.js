export function createUIRefs() {
  return {
    form: document.querySelector("#task-form"),
    input: document.querySelector("#task-input"),
    list: document.querySelector("#task-list"),
    pendingCount: document.querySelector("#pending-count"),
    errorMessage: document.querySelector("#error-message"),
  };
}

export function renderTasks(listElement, tasks) {
  listElement.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const leftContainer = document.createElement("div");
    leftContainer.className = "task-left";

    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.checked = task.completed;
    completeCheckbox.dataset.taskId = task.id;
    completeCheckbox.setAttribute("aria-label", "Marcar tarea como completada");

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;
    textSpan.classList.toggle("completed", task.completed);

    leftContainer.appendChild(completeCheckbox);
    leftContainer.appendChild(textSpan);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Eliminar";
    deleteButton.dataset.taskId = task.id;

    taskItem.appendChild(leftContainer);
    taskItem.appendChild(deleteButton);

    listElement.appendChild(taskItem);
  });
}

export function updatePendingCount(pendingCountElement, value) {
  pendingCountElement.textContent = String(value);
}

export function showError(errorElement, message) {
  errorElement.textContent = message;
}

export function clearError(errorElement) {
  errorElement.textContent = "";
}
