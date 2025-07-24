import Form__ExerciseNestedForm from "./Form__ExerciseNestedForm";
import Card__AddExercise from "./Card__AddExercise";
import Form__Input from "./Form__Input";
import { useState } from "react";
import Heading from "../Atoms/Text/Heading";
import ButtonClose from "../Button/ButtonClose";

export default function Form() {
  const [exercises, setExercises] = useState([{}]);
  const handleAddExercise = () => {
    setExercises([...exercises, {}]);
    console.log(exercises);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const workout = {
      name: data.name,
      exercises: exercises.map((_, index) => {
        return {
          id: data[`${index}-exercise`],
          reps: data[`${index}-reps`],
          sets: data[`${index}-sets`],
        };
      }),
    };
    console.log(workout.name);
    console.table(workout.exercises);

    // event.target.reset()
  };

  return (
    <>
      <ButtonClose href="/" />
      <h1>Workout Form</h1>
      <form onSubmit={handleSubmit}>
        <Form__Input name="name">Workout Name</Form__Input>
        {exercises.map((_, index) => (
          <Form__ExerciseNestedForm name={index} key={index} />
        ))}
        <Heading>{exercises.length}</Heading>
        <Card__AddExercise onClick={handleAddExercise} />
        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </form>
    </>
  );
}
