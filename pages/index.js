import Heading from "@/components/Atoms/Text/Heading";
import WorkoutsList from "@/components/Workouts/WorkoutsList";
import styled from "styled-components";

export default function HomePage() {
  return (
    <main>
      <Header>atomic workouts</Header>
      <Heading>Catalogue</Heading>
      <WorkoutsList />
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
