import Link from "next/link";
import WorkoutCard from "../Workouts/WorkoutCard";
import ButtonAdd from "../Button/ButtonAdd";
import useSWR from "swr";
import styled from "styled-components";

export default function List({ workouts }) {
  const { data: exercises, isLoading, error  } = useSWR(`/api/exercises`);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;

  return (
    <>
      <ButtonAdd />
      {workouts.map((workout) => {
        const workoutExerciseIds = workout.exercises.map((e) => e._id);
        const filteredExercises = exercises.filter((exercise) =>
          workoutExerciseIds.includes(exercise._id)
        );
        console.log("list filtered Exercises", filteredExercises[0]);
        console.log("list workoutExerciseIds", workoutExerciseIds[0]);

        return (
          <StyledLink key={workout._id} href={`/workouts/${workout._id}`}>
            <WorkoutCard
              key={workout._id}
              workout={workout}
              exercises={filteredExercises}
            />
          </StyledLink>
        );
      })}
    </>
  );
}

const StyledLink = styled(Link)`
  color: var(--color-orange-10);
  text-decoration: none;
`;
