import Form__ExerciseNestedForm from "./Form__ExerciseNestedForm";
import Card__AddExercise from "./Card__AddExercise";
import Form__Input from "./Form__Input";
import { useState } from "react";
import Heading from "../Atoms/Text/Heading";
import ButtonClose from "../Button/ButtonClose";
import useSWR from "swr";

export default function Form() {
  const { mutate } = useSWR(`/api/workouts`);
  //preparing for updating {id, rep, set}
  const [exercises, setExercises] = useState([{ tempId: 1 }]);
  const handleAddExercise = () =>
    setExercises([...exercises, { tempId: exercises.length }]);
  const handleRemoveExercise = (id) =>
    setExercises(exercises.filter((exercise) => exercise.tempId === id));
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const workout = {
      name: data.name,
      exercises: exercises.map((exercise, index) => {
        return {
          tempId: exercise.tempId,
          exerciseId: data[`${index}-exercise`],
          reps: data[`${index}-reps`],
          sets: data[`${index}-sets`],
        };
      }),
    };
    const response = await fetch(`/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });
    if (response.ok) mutate();

    event.target.reset();
  };

  return (
    <>
      <ButtonClose href="/" />
      <h1>Workout Form</h1>
      <form onSubmit={handleSubmit}>
        <Form__Input name="name">Workout Name</Form__Input>
        {exercises.map((_, index) => (
          <Form__ExerciseNestedForm
            name={index}
            key={index}
            onDelete={handleRemoveExercise}
          />
        ))}
        <Card__AddExercise onClick={handleAddExercise} />
        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </form>
    </>
  );
}
