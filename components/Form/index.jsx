import Form__ExerciseNestedForm from "./Form__ExerciseNestedForm";
import Card__AddExercise from "./Card__AddExercise";
import Form__Input from "./Form__Input";
import { useState } from "react";
import Heading from "../Atoms/Text/Heading";

export default function Form() {
  const [exercises, setExercises] = useState([{}]);
  const handleAddExercise = () => {
    setExercises([...exercises, {}]);
    console.log(exercises);
  };

  return (
    <>
      <h1>Workout Form</h1>
      <form action="">
        <Form__Input name="name">Workout Name</Form__Input>
        {exercises.map((exercise, index) => (
          <Form__ExerciseNestedForm exercise={exercise} name={index} />
        ))}
        <Heading>{exercises.length}</Heading>
        <Card__AddExercise onClick={handleAddExercise} />
      </form>
    </>
  );
}
