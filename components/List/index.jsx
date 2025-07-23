import Link from "next/link";
import WorkoutCard from "../Workouts/WorkoutCard";
import useSWR from "swr";
import styled from "styled-components";

export default function List({ workouts }) {
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises/`);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;

  return (
    <>
      {workouts.map((workout) => (
        <StyledLink href={`/workouts/${workout._id}`}>
          <WorkoutCard
            key={workout._id}
            workout={workout}
            exercises={exercises.filter((exercise) =>
              workout.exercises
                .map(
                  (exerciseDataInWorkout) => exerciseDataInWorkout.exerciseId
                )
                .includes(exercise._id)
            )}
          />
        </StyledLink>
      ))}
    </>
  );
}

const StyledLink = styled(Link)`
  color: var(--color-orange-10);
  text-decoration: none;
`;
