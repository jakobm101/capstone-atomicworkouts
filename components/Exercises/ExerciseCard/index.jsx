import Heading from "@/components/Atoms/Text/Heading";
import Image from "next/image";
import HeadingLarge from "@/components/Atoms/Text/HeadingLarge";
import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import styled from "styled-components";

export default function ExerciseCard({ exercise }) {
  return (
    <>
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
