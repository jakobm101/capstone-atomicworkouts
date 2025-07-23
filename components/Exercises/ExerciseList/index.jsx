import Heading from "@/components/Atoms/Text/Heading";
import Link from "next/link";
import Image from "next/image";
import HeadingLarge from "@/components/Atoms/Text/HeadingLarge";
import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import useSWR from "swr";
import styled from "styled-components";

export default function ExerciseList() {
  const {
    data: exercises,
    isLoading,
    error,
  } = useSWR(`/api/exercises/`);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;
  if (!exercises) return <h2>Empty database</h2>;

  return (
    <>
      <Link href="/">Workouts</Link>
      <Heading>Exercises</Heading>
      {exercises.map((exercise) => (
        <StyledExerciseCard>
          <Image
            src={exercise.imageUrl || "power.svg"}
            alt="exercise image"
            width={50}
            height={50}
          ></Image>
          <article>
            <HeadingLarge>{exercise.name}</HeadingLarge>
            <Heading>Musclegroups</Heading>
            <StyledList>
              {exercise.muscleGroups.map((muscle) => (
                <HeadingTiny>// {muscle}</HeadingTiny>
              ))}
            </StyledList>
          </article>
        </StyledExerciseCard>
      ))}
    </>
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

const StyledExerciseCard = styled.div`
  display: flex;

  border: var(--color-orange-9) 1px solid;
  box-shadow: 0 0 1rem 1rem var(--color-orange-0),
    inset 0 1rem 1rem var(--color-orange-0);
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
  Image,
  img {
    padding-right: 10px;
  }
`;
