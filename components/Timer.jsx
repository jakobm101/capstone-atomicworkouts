import { Pause, Play, Square } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Timer({ pauseDuration = 5, setCount }) {
  const [timer, setTimer] = useState(pauseDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const buttonSize = 64;

  useEffect(() => {
    //if paused or timer done then stop and reset timer
    if (!isRunning) {
      return;
      // count laps
    } else if (timer < 0 && isRunning) {
      setCount((prev) => prev + 1);
      setIsDone(true);
      setTimer(pauseDuration);
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, isRunning, pauseDuration]);

  useEffect(() => {
    setTimer(pauseDuration);
  }, [pauseDuration]);

  const Reset = () => {
    setTimer(pauseDuration);
    setIsRunning(false);
  };

  return (
    <TimeWrapper $done={isDone}>
      <TimeDisplay>{timer}</TimeDisplay>
      <div>
        <StyledControls type="button" onClick={() => setIsRunning(!isRunning)}>
          <Play
            size={buttonSize}
            fill={
              isRunning && timer > 0 ? "var(--color-orange-10)" : "transparent"
            }
          />
          <Pause
            size={buttonSize}
            fill={
              !isRunning || timer === 0
                ? "var(--color-orange-10)"
                : "transparent"
            }
          />
        </StyledControls>
        <StyledControls onClick={Reset}>
          <Square size={buttonSize} />
        </StyledControls>
      </div>
    </TimeWrapper>
  );
}

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
  background: ${({ $done }) => ($done ? "white" : "transparent")};
  box-shadow: ${({ $done }) => ($done ? " 0 0 150px 200px white" : "none")};
  background-image: ${({ $done }) =>
    $done
      ? `repeating-linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.85) 0px,
          rgba(255, 255, 255, 0.85) 0.3px,
          transparent 0.7px,
          transparent 2.9px
        )`
      : "none"};
  border-radius: 999px;
`;

const TimeDisplay = styled.h2`
  font-size: 180px;
`;
