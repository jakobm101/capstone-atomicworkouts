import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import { collectMuscleGroups } from "@/lib/utils";
import { useState } from "react";
import Layout from "@/components/Layout";
import MuscleGroups from "@/components/MuscleGroups";
import { Pencil, Trash } from "lucide-react";
import { useSession } from 'next-auth/react';

export default function WorkoutDetailsPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const apiUrl = `/api/workouts/${id}`;
  const { data: session } = useSession();

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
      <StyledExercisesWrapper>
        <h4>Exercises</h4>
        <ul>
          {exercises.map(({ reps, sets, exercise }) => {
            return (
              <li key={exercise.name}>
                <StyledSpan>{exercise.name} </StyledSpan>
                Reps: {reps} — Sets: {sets}
              </li>
            );
          })}
        </ul>
      </StyledExercisesWrapper>
      <MuscleGroups muscleGroups={muscleGroupsInWorkout} />
	{session && (	
      <ButtonField>
        <button
          type="button"
          onClick={() => {
            router.push(`/workouts/update/${id}`);
          }}
        >
          <Pencil />
          Update
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
              <Trash /> Delete
            </button>
          </div>
        )}
      </ButtonField>)}
    </Layout>
  );
}

const StyledSpan = styled.span`
  display: inline-block;
  width: 160px;
`;

const ButtonField = styled.div`
  border-top: 1px solid var(--color-orange-5);
  padding-top: 8px;
  margin-top: 16px;
  display: flex;
  flex-flow: row wrap;
  button {
    display: flex;
    flex-flow: row;
    gap: 16px;
    justify-content: center;
    align-items: center;
    padding: 8px 16px 9px 12px;
    height: 40px;
    margin-bottom: 16px;
    svg {
      stroke-width: 1px;
    }
  }
`;

const StyledExercisesWrapper = styled.div`
  border-top: 1px solid var(--color-orange-5);
  padding-top: 8px;
  margin-top: 16px;
  li {
    padding-bottom: 16px;
  }
`;
