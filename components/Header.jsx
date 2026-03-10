import Link from "next/link";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <>
      <StyledLink href={`/`}>Atomic Workouts</StyledLink>
      <button onClick={() => (session ? signOut : signIn)}>
        {" "}
        Sign {session ? "Out" : "In"}{" "}
      </button>
    </>
  );
}

const StyledLink = styled(Link)`
  font-size: xx-small;
  position: sticky;
  top: 0;
`;
