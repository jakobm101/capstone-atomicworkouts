import styled from "styled-components";

export default function WorkoutCard({ workout, exercises }) {
  return (
    <StyledWorkoutCard>
      <h3>{workout.name}</h3>
      <StyledList>
        {exercises.map((exercise, index) => {
          return <li key={index}>{exercise.name}</li>;
        })}
      </StyledList>
    </StyledWorkoutCard>
  );
}

const StyledList = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  li {
    width: 144px;
  }
`;

const StyledWorkoutCard = styled.div`
  height: 400px;

  border: white 1px solid;
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
`;
