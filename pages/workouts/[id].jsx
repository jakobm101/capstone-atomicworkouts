import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import { collectMuscleGroups } from "@/lib/utils";
import { useState } from "react";
import Layout from "@/components/Layout";
export default function WorkoutDetailsPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const apiUrl = `/api/workouts/${id}`;

  const { data: workout, isLoading, error } = useSWR(apiUrl);
  if (isLoading) {
    return <Layout>loading</Layout>;
  }
  if (error) {
    return <Layout>error</Layout>;
  }
  if (!workout) {
    return <Layout>loading workout</Layout>;
  }
  const { name, exercises } = workout;
  const muscleGroupsInWorkout = collectMuscleGroups(exercises);

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push(`/workouts`);
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
            <li key={exercise.name}>
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
      {isDeleting ? (
        <div>
          <button type="button" onClick={() => setIsDeleting(false)}>
            Cancel Delete
          </button>
          <button type="button" onClick={handleDelete}>
            Confirm Deletion
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </Layout>
  );
}

const StyledSpan = styled.span`
  display: inline-block;
  width: 160px;
`;
