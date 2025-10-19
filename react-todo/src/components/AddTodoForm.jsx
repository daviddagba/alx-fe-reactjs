import React, { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        data-testid="todo-input"
      />
      <button type="submit">Add</button>
    </form>
  );
}
