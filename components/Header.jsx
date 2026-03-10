import Link from "next/link";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <Wrap>
      <StyledLink href={`/`}>Atomic Workouts</StyledLink>
      <StyledButton onClick={() => (session ? signOut() : signIn())}>
        Sign {session ? "Out" : "In"}
      </StyledButton>
    </Wrap>
  );
}

const StyledLink = styled(Link)`
  font-size: xx-small;
`;

const StyledButton = styled.button`
  font-size: xx-small;
  width: 100px;
`;

const Wrap = styled.div`
  position: sticky;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
`;
