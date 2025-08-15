import styled from "styled-components";
import Header from "./Header";
import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <main>
      <Header />
      <StyledDiv>{children}</StyledDiv>
      <Navigation />
    </main>
  );
}

const StyledDiv = styled.div`
  flex: 1;
  padding-bottom: 40px;
`;
