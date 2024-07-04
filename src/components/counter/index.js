import { useState } from 'react';

import './styles.css';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => setCount(count + 1)}>
        Clicks: {count}
      </button>
    </div>
  );
}
