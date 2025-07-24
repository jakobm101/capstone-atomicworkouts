import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import Dropdown from "../Dropdown";
import Card from "@/components/Atoms/Card";
import useSWR from "swr";

export default function Form__ExerciseNestedForm({ name = "dropdown"}) {
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  
  if (isLoading) return "Loading exercises";
  if (error) {
    return error.message;
  }
  return (
    <Card>
      <HeadingTiny>Adding Exercise</HeadingTiny>
      <Dropdown name={`${name}-exercise`} options={exercises} isExercises>
        Exercise
      </Dropdown>
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
    </Card>
  );
}
