import Link from "next/link";
import styled from "styled-components";

export default function Navigation() {
  return (
    <StyledDiv>
      <Link href={`/`}>Home</Link>
      <Link href={`/workouts`}>Workouts</Link>
      <Link href={`/exercises`}>Exercises</Link>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  border-top: 1px solid var(--color-orange-5);
  padding: 20px;
  margin: -20px;
  position: sticky;
  left: 0;
  right: 0;
  bottom: -20px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
