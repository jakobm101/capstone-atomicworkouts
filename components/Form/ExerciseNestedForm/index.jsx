import styled from "styled-components";
import Dropdown from "../Dropdown";
import Card from "@/components/Atoms/Card";
import useSWR from "swr";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function FormExerciseNestedForm({
  name = "dropdown",
  onDelete,
  tempId,
}) {
  //tempId is workout.exercises[x].exerciseId
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);

  const [selectedExercise, setSelectedExercise] = useState({
    name: "Crunch",
    _id: "temp",
  });
  const [selectedReps, setSelectedReps] = useState("12");
  const [selectedSets, setSelectedSets] = useState("5");
  useEffect(() => {
    if (!isLoading && !error) {
      setSelectedExercise(exercises?.find((x) => x._id === tempId));
      console.log("//////useEffect in Nested");
    }
  }, [exercises]);
  if (isLoading) {
    return <StyledCard>Loading Exercise</StyledCard>;
  }
  if (error) return error.message;
  console.log("temptId", tempId);

  console.log("selected", selectedExercise, selectedExercise.name);

  return (
    <StyledCard>
      <StyledX onClick={() => onDelete(tempId)} />
      <Dropdown
        name={`${name}-exercise`}
        options={exercises}
        isExercises
        selected={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        Exercise
      </Dropdown>
      <StyledDiv>
        <Dropdown
          name={`${name}-reps`}
          options={[8, 10, 12, 14, 16]}
          selected={selectedReps}
          onChange={(e) => setSelectedReps(e.target.value)}
        >
          Reps
        </Dropdown>
        {/* <Dropdown name={`${name}-sets`} options={[3, 4, 5, 6]} selected="5"> */}
        <Dropdown
          name={`${name}-sets`}
          options={[3, 4, 5, 6]}
          selected={selectedSets}
          onChange={(e) => setSelectedSets(e.target.value)}
        >
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
