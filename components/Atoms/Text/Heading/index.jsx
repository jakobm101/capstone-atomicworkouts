import styled from "styled-components";

export default function Heading({ children }) {
  return <StyledH1>{children}</StyledH1>;
}

const StyledH1 = styled.h2`
  font-size: 10px;
  text-transform: uppercase;
letter-spacing: 1.1;
`;
