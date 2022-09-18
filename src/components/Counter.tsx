import { useState } from 'react';

const Counter = () => {
   const [count, setCount] = useState(1);

   return (
      <>
         <h2>{count}</h2>
         <button onClick={() => setCount((v) => v + 1)}>increment</button>
      </>
   );
};

export default Counter;
