import useSWR from "swr";
import WorkoutCard2 from "../Form2/WorkoutCard2";
import { useState } from "react";
import FormInput from "./Input";

/////////////////////////////////
export default function Form() {
  // SWR Boilerplate -- loading all data
  const { data, isLoading, error } = useSWR("/api");
  const [workoutPreview, setWorkoutPreview] = useState({
    name: "Enter Name",
    exercises: [],
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  // Form Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataSubmitted = Object.fromEntries(formData);
    const workoutFormatted = {
      name: dataSubmitted.workoutName,
      exercises: [{ exerciseId: dataSubmitted.exercise1 }],
    };
    console.log("submitting", workoutFormatted);
    setWorkoutPreview(workoutFormatted);
  };
  ///////////////////////////////// JSX
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput name="workoutName">name of workout</FormInput>
        <label htmlFor="exercise1">Exercise 1</label>
  
        <select name="exercise1" id="exercise1">
          {data.exercises.map((exercise) => (
            <option value={exercise._id} key={exercise._id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <button type="submit">submit</button>
      </form>
      <WorkoutCard2 data={data} workoutToDisplay={workoutPreview} />
    </>
  );
}
