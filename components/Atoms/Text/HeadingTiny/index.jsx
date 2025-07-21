import styled from "styled-components";

export default function HeadingTiny({ children }) {
  return <StyledH6>{children}</StyledH6>;
}

const StyledH6 = styled.h6`
  margin: 0;
  padding: 0;
`;
