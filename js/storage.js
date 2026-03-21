const Storage = {
  save(columns) {
    const tasks = [];
    for (const [colId, col] of Object.entries(columns)) {
      col.querySelectorAll(".task").forEach((task) => {
        tasks.push({ text: task.querySelector(".task-text").textContent, column: colId });
      });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  load() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }
};