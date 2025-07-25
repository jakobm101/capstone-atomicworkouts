import Card from "@/components/Atoms/Card";
import styled from "styled-components";
import Heading from "@/components/Atoms/Text/Heading";
import { Plus } from "lucide-react";

export default function CardAddExercise({ ...props }) {
  return (
    <StyledCard {...props}>
      <Plus />
      <Heading>Add Exercise</Heading>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  cursor: pointer; /* █ makes it clear it's clickable */

  &:hover {
    transform: scale(1.002);
    border-color: #ccc;
  }
`;
