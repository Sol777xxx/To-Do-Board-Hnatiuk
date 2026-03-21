const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const columns = {
  current: document.getElementById("current"),
  future: document.getElementById("future"),
  done: document.getElementById("done"),
};

function saveTasks() {
  const tasks = [];
  for (const [colId, col] of Object.entries(columns)) {
    col.querySelectorAll(".task").forEach((task) => {
      tasks.push({ text: task.querySelector(".task-text").textContent, column: colId });
    });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach(({ text, column }) => {
    if (columns[column]) addTaskToColumn(text, columns[column]);
  });
}

function addTaskToColumn(text, column) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const del = document.createElement("button");
  del.className = "delete-btn";
  del.textContent = "✕";
  del.onclick = () => { task.remove(); saveTasks(); };

  task.appendChild(span);
  task.appendChild(del);

  span.addEventListener("dblclick", () => {
    span.contentEditable = "true";
    span.focus();
  });
  span.addEventListener("blur", () => {
    span.contentEditable = "false";
    saveTasks();
  });
  span.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); span.blur(); }
  });

  task.addEventListener("dragstart", () => task.classList.add("dragging"));
  task.addEventListener("dragend", () => { task.classList.remove("dragging"); saveTasks(); });

  column.appendChild(task);
}

Object.values(columns).forEach((col) => {
  col.addEventListener("dragover", (e) => { e.preventDefault(); col.classList.add("drag-over"); });
  col.addEventListener("dragleave", () => col.classList.remove("drag-over"));
  col.addEventListener("drop", () => {
    const dragging = document.querySelector(".dragging");
    if (dragging) col.appendChild(dragging);
    col.classList.remove("drag-over");
    saveTasks();
  });
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  addTaskToColumn(text, columns.current);
  saveTasks();
  input.value = "";
}

button.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

loadTasks();