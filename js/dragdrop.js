const DragDrop = {
  init(columns, onDrop) {
    Object.values(columns).forEach((col) => {
      col.addEventListener("dragover", (e) => {
        e.preventDefault();
        col.classList.add("drag-over");
      });
      col.addEventListener("dragleave", () => col.classList.remove("drag-over"));
    col.addEventListener("drop", () => {
    const dragging = document.querySelector(".dragging");
    if (dragging) {
      Logger.log("task moved to", col.id);
      col.appendChild(dragging);
    }
    col.classList.remove("drag-over");
    onDrop();
    });
    });
  },

  bindTask(task, onDragEnd) {
    task.addEventListener("dragstart", () => task.classList.add("dragging"));
    task.addEventListener("dragend", () => { task.classList.remove("dragging"); onDragEnd(); });
  }
};