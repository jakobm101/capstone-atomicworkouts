import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

export default function Navigation() {
  const { data: session } = useSession();
  return (
    <StyledDiv>
      <Link href={`/`}>Home</Link>
      <Link href={`/workouts`}>Workouts</Link>
      <Link href={`/exercises`}>Exercises</Link>
      <StyledButton onClick={() => (session ? signOut() : signIn())}>
        Sign {session ? "Out" : "In"}
      </StyledButton>{" "}
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

const StyledButton = styled.button`
  font-size: xx-small;
  width: 100px;
`;
