import Heading from "@/components/Atoms/Text/Heading";
import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";

export default function WorkoutCard({ workout, exercises }) {
  if (!exercises) {
    const { data, isLoading, error } = useSWR(`/api/exercises`);
    if (isLoading) {
      return "Loading";
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    exercises = data.filter((exercise) =>
      workout.exercises
        .map((exerciseDataInWorkout) => exerciseDataInWorkout.exerciseId)
        .includes(exercise._id)
    );
  }
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
      <Image src={`/power.svg`} width={50} height={50} alt="workout image" />
      <h3>{workout.name}</h3>
      <>
        <Heading>Exercises</Heading>
        {exercises.map((exercise) => {
          const exerciseDataInWorkout = workout.exercises.find(
            (workoutExercise) => workoutExercise.exerciseId === exercise._id
          );
          return (
            <p key={exercise._id}>
              {`${exercise.name} ---
              reps:_ ${exerciseDataInWorkout.reps}
              sets:_ ${exerciseDataInWorkout.sets}
              `}
            </p>
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
  border: var(--color-orange-9) 1px solid;
  box-shadow: 0 0 1rem 1rem var(--color-orange-0),
    inset 0 1rem 1rem var(--color-orange-0);
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
`;
