import "./index.css";
import isEmail from "validator/lib/isEmail"; // [GOOD PRACTICE] import what you need
// import validator from "validator"; // [BAD PRACTICE] the bundel will have a big size

console.log("hello llll");

document.querySelector("h1").innerText = process.env.NODE_ENV;

document.querySelector("h2").innerText = isEmail("mourad@mail.co");
