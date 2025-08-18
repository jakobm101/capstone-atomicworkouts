import Layout from "@/components/Layout";
import Timer from "@/components/Timer";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

export default function TimerPage() {
  const [sets, setSets] = useState(0);
  const [pauseDuration, setPauseDuration] = useState(3);

  return (
    <Layout>
      <Timer setCount={setSets} pauseDuration={pauseDuration} />
      <StyledH2>Sets: {sets}</StyledH2>
      <StyledButton onClick={() => setSets(0)}>
        <RefreshCcw />
      </StyledButton>
      <div>
        <label>Pause Duration</label>
        <StyledInput
          type="number"
          min="2"
          max="320"
          value={pauseDuration}
          onChange={(e) => setPauseDuration(e.target.value)}
        />
      </div>
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

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid var(--color-orange-5);
  border-radius: 0;
  box-shadow: none;
  width: 40px;
  text-align: right;
`;
