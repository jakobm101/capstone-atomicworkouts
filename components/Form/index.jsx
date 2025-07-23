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
      </form>
    </>
  );
}
