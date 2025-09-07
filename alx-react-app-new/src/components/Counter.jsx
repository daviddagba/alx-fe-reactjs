import { useState } from 'react';

function Counter() {
  // initialize state
  const [count, setCount] = useState(0);

  // optional helper handlers (clearer than inline lambdas)
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', maxWidth: '360px', margin: '16px auto' }}>
      <p style={{ fontSize: '18px', margin: '0 0 12px' }}>Current Count: <strong>{count}</strong></p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button aria-label="Increment" onClick={increment}>Increment</button>
        <button aria-label="Decrement" onClick={decrement}>Decrement</button>
        <button aria-label="Reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
