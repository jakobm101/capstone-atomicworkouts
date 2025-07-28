import styled from "styled-components";
import Dropdown from "../Dropdown";
import Card from "@/components/Atoms/Card";
import useSWR from "swr";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import dbclone from "@/lib/dbclone";

export default function FormExerciseNestedForm({
  dbExercise,
  name = "dropdown",
  onDelete,
  tempId,
}) {
  const cloneExercises = dbclone.exercises;
  // console.log("clone exercises", cloneExercises);
  // console.log("nest dbExercise id", dbExercise.exerciseId);

  // console.log(`nest props:: name ${name}, tempId ${tempId}`);
  // console.log("nest dbExercise", dbExercise);

  // const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  const exercises = cloneExercises;

  const [selectedExercise, setSelectedExercise] = useState({
    name: "Crunch",
    _id: "temp",
  });
  const [selectedReps, setSelectedReps] = useState("12");
  const [selectedSets, setSelectedSets] = useState("5");

  const currentExercise = exercises?.find(
    (x) => x._id === dbExercise.exerciseId
  );
  // console.log("⭐️ current exercise", currentExercise);

  useEffect(() => {
    if (/*!isLoading && !error*/ true) {
      setSelectedExercise(currentExercise);
      setSelectedReps(dbExercise.reps);
      setSelectedSets(dbExercise.sets);
      // console.log("////// useEffect in Nested");
    }
  }, [exercises]);
  /*
  if (isLoading) {
    return <StyledCard>Loading Exercise</StyledCard>;
  }
  if (error) return error.message;
*/
  // console.log("exercise in nested", dbExercise);
  // console.log("selected exercise", selectedExercise);

  // console.log("selected reps and sets", selectedReps, selectedSets);

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
