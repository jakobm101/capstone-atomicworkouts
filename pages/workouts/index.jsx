import Layout from "@/components/Layout";
import { collectMuscleGroups } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

export default function WorkoutsPage() {
  const { data: workouts, isLoading, error } = useSWR(`/api/workouts`);

  if (isLoading) {
    return (
      <Layout>
        <h2>isLoading</h2>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <h2>error</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>Workouts</h2>
      <StyledLink href={`/workouts/create`}>
        <Plus />
        Add New Workout
      </StyledLink>
      {workouts.map((workout) => {
        const muscleGroupsInWorkout = collectMuscleGroups(workout.exercises);

        return (
          <StyledDiv key={workout._id}>
            <h3>{workout.name}</h3>

            <h4>Exercises</h4>
            <ul>
              {workout.exercises.map(({ exercise }) => {
                return <li key={exercise._id}>{exercise.name}</li>;
              })}
            </ul>

            <h4>Muscle Groups</h4>
            <ul>
              {[...muscleGroupsInWorkout].map((muscleGroup) => (
                <li key={muscleGroup}>{muscleGroup}</li>
              ))}
            </ul>
            <Link href={`/workouts/${workout._id}`}>Details</Link>
          </StyledDiv>
        );
      })}
      <StyledLink href={`/workouts/create`}>
        <Plus />
        Add New Workout
      </StyledLink>
    </Layout>
  );
}

const StyledDiv = styled.div`
  border: 1px solid var(--color-orange-5);
  border-radius: 4px;
  padding: 0 0 10px 10px;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  padding: 32px;
  margin-bottom: 10px;
  width: 100%;

  border: var(--color-orange-5) 1px solid;
  border-radius: 4px;
`;
