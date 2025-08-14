import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

export default function WorkoutDetailsPage() {
  const router = useRouter();
  const id = router.query.id;

  const { data: workout, isLoading, error } = useSWR(`/api/workouts/${id}`);
  if (isLoading) {
    <main>loading</main>;
  }
  if (error) {
    <main>error</main>;
  }
  if (!workout) {
    return <main>loading workout</main>;
  }
  const { name, exercises } = workout;
  const muscleGroupsInWorkout = new Set();

  return (
    <main>
      <h2>Workout Details</h2>
      <h3>{name}</h3>
      <h4>Exercises</h4>
      <ul>
        {exercises.map((exerciseInWorkout) => {
          const { reps, sets, exercise } = exerciseInWorkout;
          exercise.muscleGroups.map((muscleGroup) =>
            muscleGroupsInWorkout.add(muscleGroup)
          );
          return (
            <li key={exercises.name}>
              <StyledSpan>{exercise.name} </StyledSpan>
              || Reps: {reps} - Sets: {sets}
            </li>
          );
        })}
      </ul>
      <h4>Muscle Groups</h4>
      <ul>
        {[...muscleGroupsInWorkout].map((muscle) => {
          return <li key={muscle}>{muscle}</li>;
        })}
      </ul>
    </main>
  );
}

const StyledSpan = styled.span`
  display: inline-block;
  width: 110px;
`;
