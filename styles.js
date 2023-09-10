import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-size: 1rem;
    margin: 0;
    padding: 0;
    font-family: system-ui;
    background-color: #fafafa;
  }

  h1,h2,h3,h4,h5,h6 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 600;
    line-height: 1.2;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
    color: #171717;
  }
`;
