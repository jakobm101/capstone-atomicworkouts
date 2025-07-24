import styled from "styled-components";
import Dropdown from "../Dropdown";
import Card from "@/components/Atoms/Card";
import useSWR from "swr";
import { X } from "lucide-react";

export default function Form__ExerciseNestedForm({
  name = "dropdown",
  onDelete,
  tempId,
}) {
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  console.log('temp Id',tempId);
  
  const testDelete = (id) => {
    console.log("test delete", id);
    onDelete(id);
  };

  if (isLoading) return "Loading exercises";
  if (error) {
    return error.message;
  }
  return (
    <StyledCard>
      <StyledX onClick={() => onDelete(tempId)} />
      <Dropdown name={`${name}-exercise`} options={exercises} isExercises>
        Exercise
      </Dropdown>
      <StyledDiv>
        <Dropdown
          name={`${name}-reps`}
          options={[8, 10, 12, 14, 16]}
          selected="12"
        >
          Reps
        </Dropdown>
        <Dropdown name={`${name}-sets`} options={[3, 4, 5, 6]} selected="5">
          Sets
        </Dropdown>
      </StyledDiv>
    </StyledCard>
  );
}

const StyledX = styled(X)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const StyledCard = styled(Card)`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  gap: 12px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
`;
