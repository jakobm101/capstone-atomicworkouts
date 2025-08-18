import Layout from "@/components/Layout";
import MuscleGroups from "@/components/MuscleGroups";
import Timer from "@/components/Timer";
import libExercises from "@/lib/exercises";
import { RefreshCcw, SquareChevronDown, SquareChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function TimerPage() {
  const [sets, setSets] = useState(0);
  const [pauseDuration, setPauseDuration] = useState(3);
  const [exercise, setExercise] = useState("Pull-Up"); // default safe SSR value
  const buttonSize = 64;

  useEffect(() => {
    const exercises = libExercises;
    const random = exercises[Math.floor(Math.random() * exercises.length)];
    setExercise(random);
  }, []);

  const { instructions, name, muscleGroups } = exercise;

  return (
    <Layout>
      <h5>Random Exercise Suggestion:</h5>
      <h1>{name}</h1>
      <h3>Pause Between Sets:</h3>
      <Timer setCount={setSets} pauseDuration={pauseDuration} />
      <StyledMenuRow>
        <StyledH2>Sets: {sets}</StyledH2>
        <StyledButton onClick={() => setSets(0)}>
          <RefreshCcw />
        </StyledButton>
      </StyledMenuRow>
      <StyledMenuRow>
        <label>Pause Duration</label>
        <StyledInput
          type="number"
          min="2"
          max="320"
          value={pauseDuration}
          onChange={(e) => setPauseDuration(e.target.value)}
        />
        <StyledButton onClick={() => setPauseDuration((prev) => prev + 1)}>
          <SquareChevronUp size={buttonSize} />
        </StyledButton>
        <StyledButton onClick={() => setPauseDuration((prev) => prev - 1)}>
          <SquareChevronDown size={buttonSize} />
        </StyledButton>
      </StyledMenuRow>
      <hr />
      {muscleGroups && (
        <>
          <MuscleGroups muscleGroups={muscleGroups} />
          <h3>Instructions</h3>
          <ol>
            {instructions?.map((step) => (
              <li key={step}>{step}</li> //
            ))}
          </ol>
        </>
      )}
    </Layout>
  );
}

const StyledH2 = styled.h2`
  display: inline;
  font-size: xxx-large;
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

const StyledMenuRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`;
