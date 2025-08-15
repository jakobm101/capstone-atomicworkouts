import styled from "styled-components";

export default function Card({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

const StyledDiv = styled.div`
  border: 1px solid var(--color-orange-5);
  border-radius: 4px;
  padding: 0 0 10px 10px;
  margin-bottom: 10px;
`;
