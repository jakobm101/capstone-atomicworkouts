import { createGlobalStyle } from "styled-components";
import { spaceMono } from "@/lib/fonts";

export default createGlobalStyle`
  :root {
    ${spaceMono.variable && `--font-space-mono: ${spaceMono.variable};`}
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-space-mono), monospace;
   font-weight: 100;
    letter-spacing: 0.7px;
    color: rgb(69%, 35%, 0%);
    text-shadow: 
    0 0 2px rgba(69%, 35%, 0%, 0.9),
    0 0 4px rgba(69%, 35%, 0%, 0.5),
    0 0 8px rgba(69%, 35%, 0%, 0.5),
    0 0 16px rgba(69%, 35%, 0%, 0.5);
    background-color: #000;
    background-image: repeating-linear-gradient(
    to bottom,
    rgba(69%, 35%, 0%, 0.15), 
    rgba(69%, 35%, 0%, 0.05) 1px,
    transparent 1px,
    transparent 4px
  );
;
  }


main {
  width: 400px;
  height: 90vh;
  margin: auto;
  margin-top: 5vh;
  color: white;
  border-radius: 20px;
  border: grey 1px solid;
  padding: 20px;
  overflow: scroll;
}

`;
