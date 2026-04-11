const assert = require("assert");

// Тестуємо логіку валідації
const MAX_LENGTH = 50;

function validate(text) {
  if (!text || text.trim() === "") return "empty";
  if (text.length > MAX_LENGTH) return "toolong";
  return null;
}

// Тест 1 — порожній рядок
assert.strictEqual(validate(""), "empty");
console.log("✅ Test 1 passed: empty string returns 'empty'");

// Тест 2 — Знову навмисно зламаний
assert.strictEqual(validate("a".repeat(51)), "valid");
console.log("✅ Test 2 passed: long string returns 'toolong'");

// Тест 3 — валідний текст
assert.strictEqual(validate("Buy milk"), null);
console.log("✅ Test 3 passed: valid text returns null");

console.log("\n✅ All tests passed!");