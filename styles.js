import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: #000;
  }


main {
  width: 400px;
  height: 90vh;
  margin: auto;
margin-top: 5vh;
  color: white;
  border-radius: 20px;
  border: white 1px solid;
  padding: 20px;
  overflow: scroll;
}

`;
