import Link from "next/link";
import styled from "styled-components";

export default function Navigation() {
  return (
    <StyledDiv>
      <Link href={`/`}>Home</Link>
      <Link href={`/exercises`}>Exercises</Link>
      <Link href={`/workouts`}>Workouts</Link>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  border-top: 1px solid var(--color-orange-5);
`;
