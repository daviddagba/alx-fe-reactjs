import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '12px', 
      borderRadius: '8px', 
      maxWidth: '360px', 
      margin: '16px auto', 
      backgroundColor: '#f9f9f9' 
    }}>
      <p style={{ fontSize: '18px', marginBottom: '12px' }}>
        Current Count: <strong>{count}</strong>
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          style={{ 
            padding: '6px 12px', 
            border: 'none', 
            borderRadius: '4px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            cursor: 'pointer' 
          }}
          onClick={increment}
        >
          Increment
        </button>
        <button 
          style={{ 
            padding: '6px 12px', 
            border: 'none', 
            borderRadius: '4px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            cursor: 'pointer' 
          }}
          onClick={decrement}
        >
          Decrement
        </button>
        <button 
          style={{ 
            padding: '6px 12px', 
            border: 'none', 
            borderRadius: '4px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            cursor: 'pointer' 
          }}
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
