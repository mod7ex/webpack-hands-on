import { useState } from "react";
import isEmail from "validator/lib/isEmail";

export default () => {
    const [count, setCount] = useState(1);

    return (
        <>
            <h1>Hello world !</h1>
            <hr />
            <h2>{count}</h2>

            <h2>{isEmail("mourad@mail.com") ? "yes this is an email" : "no it is not an email"}</h2>

            <button onClick={() => setCount((v) => v + 1)}>increment</button>
            <hr />
            <img src="./assets/img/giphy.gif" width={300} alt="" />
            {/* <hr /> */}
            {/* <img src="./assets/img/image.jpg" width={300} alt="" /> */}
            <hr />
            <div className="hero">Lorem ipsum dolor sit amet consectetur.</div>
        </>
    );
};
