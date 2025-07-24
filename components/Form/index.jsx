import Dropdown from "./Dropdown";
import Form__Input from "./Form__Input";

export default function Form() {
  return (
    <>
      <h1>Workout Form</h1>
      <form action="">
        <Form__Input name="name">Workout Name</Form__Input>
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
      </form>
    </>
  );
}
