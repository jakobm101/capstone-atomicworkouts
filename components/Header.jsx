import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrap>
      <StyledLink href={`/`}>Atomic Workouts</StyledLink>
    </Wrap>
  );
}

const StyledLink = styled(Link)`
  font-size: xx-small;
`;

const Wrap = styled.div`
  position: sticky;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
`;
