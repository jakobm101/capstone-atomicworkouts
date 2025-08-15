import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  return <StyledLink href={`/`}>Atomic Workouts</StyledLink>;
}

const StyledLink = styled(Link)`
  font-size: xx-small;
`;
