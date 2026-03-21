const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const currentColumn = document.getElementById("current");

button.addEventListener("click", function () {
    const text = input.value;

    if (text === "") return;

    const task = document.createElement("div");
    task.className = "task";
    task.textContent = text;

    currentColumn.appendChild(task);

    input.value = "";
});