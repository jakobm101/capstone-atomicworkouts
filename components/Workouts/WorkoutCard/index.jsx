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
        <h4>Exercises</h4>
        {exercises.map((exercise, index) => {
          return (
            <p key={index}>
              {`${exercise.name} ---
              reps:_ ${
                workout.exercises.find(
                  (exerciseDataInWorkout) =>
                    exerciseDataInWorkout.exerciseId === exercise._id
                ).reps
              }
              sets:_ ${
                workout.exercises.find(
                  (exerciseDataInWorkout) =>
                    exerciseDataInWorkout.exerciseId === exercise._id
                ).sets
              }
              `}
            </p>
          );
        })}
      </>
      <h4>Muscle Groups</h4>
      <StyledList>
        {uniqueMuscles.map((muscle, index) => {
          return <span key={index}>{muscle}</span>;
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
  height: 500px;

  border: white 1px solid;
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
`;
