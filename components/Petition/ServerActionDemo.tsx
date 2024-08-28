'use client';

import { useState } from 'react';
import { serverTest } from './petitionServerActions';

export default function ServerActionDemo() {
  const [count, setCount] = useState(2);

  const handleClick = async () => {
    const newCount = await serverTest(count);

    setCount(newCount);
  };

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}
