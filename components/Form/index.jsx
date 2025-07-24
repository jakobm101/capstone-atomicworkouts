import Form__ExerciseNestedForm from "./Form__ExerciseNestedForm";
import Card__AddExercise from "./Card__AddExercise";
import Form__Input from "./Form__Input";
import { useState } from "react";
import ButtonClose from "../Button/ButtonClose";
import useSWR from "swr";
import { uid } from "uid";

export default function Form() {
  const { mutate } = useSWR(`/api/workouts`);
  //preparing for updating {id, rep, set}
  const [exercises, setExercises] = useState([{ tempId: 1 }, { tempId: 2 }]);

  console.log(exercises);

  const handleAddExercise = () => {
    setExercises([...exercises, { tempId: uid() }]);
  };
  const handleRemoveExercise = (id) => {
    console.log("handleRemoveExercise id", id);
    setExercises(exercises.filter((exercise) => exercise.tempId !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const workout = {
      name: data.name,
      exercises: exercises.map((_, index) => {
        return {
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
        {exercises.map((exercise) => (
          <Form__ExerciseNestedForm
            tempId={exercise.tempId}
            name={exercise.tempId}
            key={exercise.tempId}
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
