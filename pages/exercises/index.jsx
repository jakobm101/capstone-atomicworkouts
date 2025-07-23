import Heading from "@/components/Atoms/Text/Heading";
import ExerciseList from "@/components/Exercises/ExerciseList";
import styled from "styled-components";

export default function Exercises() {
  return (
    <main>
      <Header>atomic workouts</Header>
      <Heading>Catalogue</Heading>
      <ExerciseList/>
    </main>
  );
}

const Header = styled.h3`
  position: sticky;
  font-size: 8px;
  top: 10px;
  left: 10px;
  z-index: 10;
`;
