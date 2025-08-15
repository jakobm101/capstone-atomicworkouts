import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import { collectMuscleGroups } from "@/lib/utils";
import Layout from "@/components/Layout";
export default function WorkoutDetailsPage() {
  const router = useRouter();
  const id = router.query.id;
  const apiUrl = `/api/workouts/${id}`;

  const { data: workout, isLoading, error } = useSWR(apiUrl);
  if (isLoading) {
    <Layout>loading</Layout>;
  }
  if (error) {
    <Layout>error</Layout>;
  }
  if (!workout) {
    return <Layout>loading workout</Layout>;
  }
  const { name, exercises } = workout;
  const muscleGroupsInWorkout = collectMuscleGroups(exercises);

  const handleDelete = async () => {
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push(`/`);
    }
  };

  return (
    <Layout>
      <h2>Workout Details</h2>
      <h3>{name}</h3>
      <h4>Exercises</h4>
      <ul>
        {exercises.map(({ reps, sets, exercise }) => {
          return (
            <li key={exercises.name}>
              <StyledSpan>{exercise.name} </StyledSpan>
              _Reps: {reps} - Sets: {sets}
            </li>
          );
        })}
      </ul>
      <h4>Muscle Groups</h4>
      <ul>
        {muscleGroupsInWorkout.map((muscle) => {
          return <li key={muscle}>{muscle}</li>;
        })}
      </ul>
      <button
        type="button"
        onClick={() => {
          router.push(`/workouts/update/${id}`);
        }}
      >
        update
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <div>
        <Link href={`/`}>home</Link>
        <Link href={`/workouts`}>Workouts</Link>
      </div>
    </Layout>
  );
}

const StyledSpan = styled.span`
  display: inline-block;
  width: 160px;
`;
