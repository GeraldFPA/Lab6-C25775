export function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };
}

export function addTask(tasks, text) {
  return [...tasks, createTask(text)];
}

export function toggleTask(tasks, taskId) {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

export function countPendingTasks(tasks) {
  return tasks.filter((task) => !task.completed).length;
}
