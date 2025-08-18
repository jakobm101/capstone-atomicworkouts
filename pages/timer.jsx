import Layout from "@/components/Layout";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Timer() {
  const pauseTime = 3;
  const [timer, setTimer] = useState(pauseTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (timer <= 0 && !isRunning) {
      setTimer(pauseTime);
      setIsRunning(!isRunning);
    }
    if (timer <= 0 || !isRunning) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, isRunning]);

  return (
    <Layout>
      <h1>Timer</h1>
      <TimeWrapper>
        <TimeDisplay>{timer}</TimeDisplay>
        <StyledPlayPause type="button" onClick={() => setIsRunning(!isRunning)}>
          <Play
            fill={
              isRunning && timer > 0 ? "var(--color-orange-10)" : "transparent"
            }
          />
          <Pause
            fill={
              !isRunning || timer === 0
                ? "var(--color-orange-10)"
                : "transparent"
            }
          />
        </StyledPlayPause>
      </TimeWrapper>
    </Layout>
  );
}

const StyledPlayPause = styled.button`
  border: none;
  box-shadow: none;
  cursor: pointer;
  &:hover {
    border: none;
    box-shadow: none;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 64px;
`;

const TimeDisplay = styled.h2`
  font-size: 128px;
`;
