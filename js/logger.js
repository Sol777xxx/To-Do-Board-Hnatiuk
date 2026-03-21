const Logger = {
  log(action, detail = "") {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${action}${detail ? ": " + detail : ""}`);
  }
};