import styled from "styled-components";

export default function Card({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

const StyledDiv = styled.div`
  border: var(--color-orange-9) 1px solid;
  box-shadow: 0 0 1rem 1rem var(--color-orange-0),
    inset 0 1rem 1rem var(--color-orange-0);
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
`;
