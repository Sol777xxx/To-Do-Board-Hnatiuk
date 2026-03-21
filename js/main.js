const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const charCount = document.getElementById("charCount");
const errorMsg = document.getElementById("errorMsg");

const columns = {
  current: document.getElementById("current"),
  future: document.getElementById("future"),
  done: document.getElementById("done"),
};

function save() {
  Storage.save(columns);
}

function showError(msg) {
  errorMsg.textContent = "⚠️ " + msg;
  setTimeout(() => errorMsg.textContent = "", 2000);
}

function addTaskToColumn(text, column) {
  const task = Tasks.create(text, save);
  DragDrop.bindTask(task, save);
  column.appendChild(task);
}

function addTask() {
  const text = input.value.trim();
  const error = Tasks.validate(text);

  if (error === "empty") {
    input.classList.add("input-error");
    setTimeout(() => input.classList.remove("input-error"), 600);
    return;
  }
  if (error === "toolong") {
    showError(`Максимум ${Tasks.MAX_LENGTH} символів`);
    return;
  }
  if (error === "duplicate") {
    showError("Така задача вже існує!");
    input.classList.add("input-error");
    setTimeout(() => input.classList.remove("input-error"), 600);
    return;
  }

  addTaskToColumn(text, columns.current);
  save();
  input.value = "";
  input.focus();
  charCount.textContent = `0 / ${Tasks.MAX_LENGTH}`;
  button.disabled = true;
}

button.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });
input.addEventListener("input", () => {
  const len = input.value.length;
  button.disabled = input.value.trim() === "";
  charCount.textContent = `${len} / ${Tasks.MAX_LENGTH}`;
  charCount.style.color = len > Tasks.MAX_LENGTH ? "#e00" : "#999";
});
button.disabled = true;

DragDrop.init(columns, save);

Storage.load().forEach(({ text, column }) => {
  if (columns[column]) addTaskToColumn(text, columns[column]);
});