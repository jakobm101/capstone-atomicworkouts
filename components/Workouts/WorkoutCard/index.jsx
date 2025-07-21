import Heading from "@/components/Atoms/Text/Heading";
import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import styled from "styled-components";

export default function WorkoutCard({ workout, exercises }) {
  const usedMuscle = [];
  exercises.map((exercise) => usedMuscle.push(...exercise.muscleGroups));
  const uniqueMuscles = [...new Set(usedMuscle)];
  console.log(workout.exercises[0].reps);

  const muscleCount = {};
  for (const muscle of usedMuscle) {
    muscleCount[muscle] = muscleCount[muscle] ? muscleCount[muscle] + 1 : 1;
  }

  return (
    <StyledWorkoutCard>
      <h3>{workout.name}</h3>
      <>
        <Heading>Exercises</Heading>
        {exercises.map((exercise, index) => {
          const exerciseDataInWorkout = workout.exercises.find(
            workoutExercise.exerciseId === exercise._id
          );
          return (
            <StyledParagraph key={index}>
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
        {uniqueMuscles.map((muscle, index) => {
          return <HeadingTiny key={index}>{muscle}</HeadingTiny>;
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
