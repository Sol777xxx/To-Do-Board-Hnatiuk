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
    del.onclick = () => { 
    Logger.log("task deleted", span.textContent);
    task.remove(); 
    onSave(); 
};

    task.appendChild(span);
    task.appendChild(del);

    span.addEventListener("dblclick", () => {
      span.dataset.before = span.textContent; // зберігаємо оригінал перед редагуванням
      span.contentEditable = "true";
      span.focus();
    });

    span.addEventListener("blur", () => {
      span.contentEditable = "false";
      const newText = span.textContent.trim();
      const oldText = span.dataset.before || "";

      if (!newText) {
        span.textContent = oldText; // порожній — повертаємо старий
        return;
      }
      // якщо текст змінився і є дублікат іншої задачі
      if (newText.toLowerCase() !== oldText.toLowerCase() && Tasks.isDuplicate(newText)) {
        span.textContent = oldText; // відкочуємо
        const err = document.getElementById("errorMsg");
        if (err) {
          err.textContent = "Така задача вже існує!";
          setTimeout(() => err.textContent = "", 2000);
        }
        return;
      }

      onSave();
    });

    span.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); span.blur(); }
      if (e.key === "Escape") {
        span.textContent = span.dataset.before || text;
        span.blur();
      }
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