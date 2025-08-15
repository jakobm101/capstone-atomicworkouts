import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --font-space-mono: 'Space Mono', 'Space Mono Fallback';
    --color-orange-10: rgba(99%, 55%, 25%, 1);
    --color-orange-9: rgba(99%, 55%, 25%, 0.9);
    --color-orange-5: rgba(99%, 55%, 25%, 0.5);
    --color-orange-0: rgba(99%, 55%, 25%, 0.1);
    --rgb-orange: 99%, 55%, 25%;
    --color-background: black;
    --color-contrast: white;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    transition: 0.3s all ease-in-out;
    margin: 0;

    font-family: var(--font-space-mono);
    font-weight: 100;
    letter-spacing: 0.5px;
    color: var(--color-orange-10);
    text-shadow: 
      0 0 2px var(--color-orange-9),
      0 0 4px var(--color-orange-5),
      0 0 8px var(--color-orange-5),
      0 0 16px var(--color-orange-5);

    background-color: var(--color-background);
    background-image: 
      repeating-linear-gradient( 
        to bottom,
          rgba(var(--rgb-orange),0.15) 0.0px,
          rgba(var(--rgb-orange),0.25) 0.3px,
          transparent 0.7px,
          transparent 2.9px );
  
}

main::-webkit-scrollbar {
  display: none;/* Chrome/Safari */
}

main {
  display: flex;
  flex-direction: column;
  
  position: relative;
  width: 400px;
  height: 90vh;
  margin: auto;
  margin-top: 5vh;
  border: var(--color-orange-10) 1px solid;
  border-radius: 20px;
  box-shadow: 
    0 0 1rem 1rem var(--color-orange-0), 
    inset 0 1rem 1rem var(--color-orange-0);
  padding: 20px;

  overflow: auto;
  scrollbar-width: none;/* Firefox */
  -ms-overflow-style: none;
}


button, select, input {
  margin: 4px;
  border: var(--color-orange-5) 1px solid;
  border-radius: 8px;
  padding: 8px;

  background-color: transparent; 
  font-family: var(--font-space-mono);
  color: var(--color-orange-10);
  letter-spacing: 0.07rem;

  text-shadow: 
    0 0 2px var(--color-orange-9),
    0 0 4px var(--color-orange-5),
    0 0 8px var(--color-orange-5),
    0 0 16px var(--color-orange-5);

  box-shadow: 
    0 0 .1rem .1rem var(--color-orange-0), 
    inset 0 1rem 1rem var(--color-orange-0);
}

button {
  cursor: pointer;
  &:hover{
  box-shadow: 
    0 0 .2rem .2rem var(--color-orange-0), 
    inset 0 2rem 2rem var(--color-orange-0);
  }
}

label {
  font-size:12px;
  text-transform:uppercase;
}

a {
  color: var(--color-orange-10);
  text-underline-offset: 0.3rem;
  text-decoration-thickness: 0.1px;
  padding: 0 5px 0 0;
  &:visited {
    color: var(--color-orange-5);
  }
  &:hover {
    color: var(--color-contrast);
        text-shadow: 
    0 0 8px var(--color-orange-10),
    0 0 10px var(--color-orange-9),
    0 0 16px var(--color-orange-5),
    0 0 32px var(--color-orange-5);
  }
  
}

input::placeholder {
color: var(--color-orange-5)
}

ul {
  list-style: none;
  margin-block-start: 0;
  padding-inline-start: 0;

}
`;
