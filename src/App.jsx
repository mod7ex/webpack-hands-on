import React, { useState } from "react";

export default () => {
    const [count, setCount] = useState(1);

    return (
        <>
            <h1>Hello world !</h1>

            <hr />

            <h2>{count}</h2>

            <button onClick={() => setCount((v) => v + 1)}>increment</button>
        </>
    );
};
