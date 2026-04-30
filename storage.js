const STORAGE_KEY = "todo-tasks";

export function loadTasks() {
  const rawTasks = localStorage.getItem(STORAGE_KEY);

  if (!rawTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(rawTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
