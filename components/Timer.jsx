import { Pause, Play, Square } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Timer({ pauseDuration = 5, setCount }) {
  const [timer, setTimer] = useState(pauseDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const buttonSize = 64;

  useEffect(() => {
    if (!isRunning) {
      return;
    } else if (timer < 0 && isRunning) {
      setCount((prev) => prev + 1);
      setIsDone(true);
      setTimer(pauseDuration);
      setIsRunning(false);
      return;
    }
    setIsDone(false);

    const interval = setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, isRunning, pauseDuration]);

  useEffect(() => {
    setTimer(pauseDuration);
  }, [pauseDuration]);

  const Reset = () => {
    setTimer(pauseDuration);
    setIsRunning(false);
    setIsDone(false);
  };

  return (
    <TimeWrapper $done={isDone}>
      <TimeDisplay $done={isDone}>{isDone ? "DONE" : timer}</TimeDisplay>
      <StyledControlsWrapper>
        <StyledControls type="button" onClick={() => setIsRunning(!isRunning)}>
          <Play
            strokeWidth={1}
            size={buttonSize}
            fill={isRunning ? "var(--color-orange-10)" : "transparent"}
          />
          <Pause
            size={buttonSize}
            fill={!isRunning ? "var(--color-orange-10)" : "transparent"}
            strokeWidth={1}
          />
        </StyledControls>
        <StyledControls onClick={Reset}>
          <Square size={buttonSize} strokeWidth={1} />
        </StyledControls>
      </StyledControlsWrapper>
    </TimeWrapper>
  );
}

const StyledControlsWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const StyledControls = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: none;
  cursor: pointer;
  &:hover {
    border: none;
    box-shadow: none;
    svg {
      fill: var(--color-orange-5);
    }
  }
`;

const TimeWrapper = styled.div`
  display: flex;

  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  /* background: ${({ $done }) => ($done ? "white" : "transparent")}; */
  box-shadow: ${({ $done }) =>
    $done
      ? "0 0 150px 200px var(--color-orange-5),inset 0 0 79px 99px var(--color-orange-5)"
      : "none"};
  border-radius: 999px;
`;

const TimeDisplay = styled.h2`
  text-align: center;
  margin: 0;
  padding: 0;
  height: 234px;
  font-size: ${({ $done }) => ($done ? "140px" : "180px")};
`;
