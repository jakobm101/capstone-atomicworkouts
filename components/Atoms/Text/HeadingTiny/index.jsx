import styled from "styled-components";

export default function HeadingTiny({ children }) {
  return (
    <>
      <StyledHeadingTiny>{children}</StyledHeadingTiny>
    </>
  );
}

const StyledHeadingTiny = styled.h6`
  position: fixed;
  top: 40px;
`;
