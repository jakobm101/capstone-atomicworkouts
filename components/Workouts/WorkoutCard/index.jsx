import Heading from "@/components/Atoms/Text/Heading";
import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import styled from "styled-components";

export default function WorkoutCard({ workout, exercises }) {
  const muscleCount = {};
  const uniqueMusclesSet = new Set();

  for (const exercise of exercises) {
    for (const muscle of exercise.muscleGroups) {
      muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
      uniqueMusclesSet.add(muscle);
    }
  }

  const uniqueMuscles = [...uniqueMusclesSet];

  return (
    <StyledWorkoutCard>
      <h3>{workout.name}</h3>
      <>
        <Heading>Exercises</Heading>
        {exercises.map((exercise) => {
          const exerciseDataInWorkout = workout.exercises.find(
            (workoutExercise) => workoutExercise.exerciseId === exercise._id
          );
          return (
            <StyledParagraph key={exercise._id}>
              {`${exercise.name} ---
              reps:_ ${exerciseDataInWorkout.reps}
              sets:_ ${exerciseDataInWorkout.sets}
              `}
            </StyledParagraph>
          );
        })}
      </>
      <Heading>Muscle Groups</Heading>
      <StyledList>
        {uniqueMuscles.map((muscle) => {
          return <HeadingTiny key={muscle}>{muscle}</HeadingTiny>;
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
  border: grey 1px solid;
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
`;

const StyledParagraph = styled.p`
  font-family: monospace;
`;
