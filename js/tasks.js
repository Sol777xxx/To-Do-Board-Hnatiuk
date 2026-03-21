const Tasks = {
  MAX_LENGTH: 50,

  create(text, onSave) {
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "✕";
    del.onclick = () => { task.remove(); onSave(); };

    task.appendChild(span);
    task.appendChild(del);

    span.addEventListener("dblclick", () => {
      span.contentEditable = "true";
      span.focus();
    });
    span.addEventListener("blur", () => {
      span.contentEditable = "false";
      onSave();
    });
    span.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); span.blur(); }
    });

    return task;
  },

  isDuplicate(text) {
    return Array.from(document.querySelectorAll(".task-text"))
      .some(el => el.textContent.trim().toLowerCase() === text.toLowerCase());
  },

  validate(text) {
    if (!text) return "empty";
    if (text.length > Tasks.MAX_LENGTH) return "toolong";
    if (Tasks.isDuplicate(text)) return "duplicate";
    return null;
  }
};