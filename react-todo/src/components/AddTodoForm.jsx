import React, { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="Add a new todo"
        onChange={(e) => setText(e.target.value)}
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-btn">Add Todo</button>
    </form>
  );
}
