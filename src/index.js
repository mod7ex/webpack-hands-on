// import "./index.css";
import validator from "validator";

console.log("hello llll");

document.querySelector("h1").innerText = process.env.NODE_ENV;

document.querySelector("h2").innerText = validator.isEmail("mourad@mail.co");
