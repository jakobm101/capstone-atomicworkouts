import Layout from "@/components/Layout";
import Timer from "@/components/Timer";
import { BrushCleaning, RefreshCcw } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

export default function TimerPage() {
  const [sets, setSets] = useState(0);
  return (
    <Layout>
      <Timer setCount={setSets} />
      <StyledH2>Sets: {sets}</StyledH2>
      <StyledButton onClick={() => setSets(0)}>
        <RefreshCcw />
      </StyledButton>
    </Layout>
  );
}

const StyledH2 = styled.h2`
  display: inline;
`;

const StyledButton = styled.button`
  border: none;
  box-shadow: none;
  cursor: pointer;
  padding: 0;
  margin: 0;

  svg {
    stroke: var(--color-orange-5);
  }

  &:hover {
    box-shadow: none;
    svg {
      stroke: var(--color-orange-10);
    }
  }
`;
