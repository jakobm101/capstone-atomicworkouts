import HeadingTiny from "@/components/Atoms/Text/HeadingTiny";
import Dropdown from "../Dropdown";
import Card from "@/components/Atoms/Card";

export default function Form__ExerciseNestedForm() {
  return (
    <Card>
      <HeadingTiny>Adding Exercise</HeadingTiny>
      <Dropdown name="exercises1" options={[1, 2, 3]}>
        Exercise
      </Dropdown>
      <Dropdown
        name="exercise1-reps"
        options={[8, 10, 12, 14, 16]}
        selected="12"
      >
        Reps
      </Dropdown>
      <Dropdown name="exercise1-sets" options={[3, 4, 5, 6]} selected="5">
        Sets
      </Dropdown>
    </Card>
  );
}
