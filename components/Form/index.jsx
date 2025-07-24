import { Plus } from "lucide-react";
import Card from "../Atoms/Card";
import Heading from "../Atoms/Text/Heading";
import Dropdown from "./Dropdown";
import Form__ExerciseNestedForm from "./Form__ExerciseNestedForm";
import Form__Input from "./Form__Input";

export default function Form() {
  return (
    <>
      <h1>Workout Form</h1>
      <form action="">
        <Form__Input name="name">Workout Name</Form__Input>
        <Form__ExerciseNestedForm />
        {/* <Card__Add-Exercise */}
        <Card>
          <Heading>Add another Exercise</Heading>
          <Plus />
        </Card>
      </form>
    </>
  );
}
