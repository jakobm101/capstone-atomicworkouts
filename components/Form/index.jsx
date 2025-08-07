/***
 *
 * TASKS:
 * - list of exercises that does not crash
 * - loading through an array of empty objects is a bit weird
 * - submitting works with dynamic amount of exercises
 */
import useSWR from "swr";
import WorkoutCard2 from "../Form2/WorkoutCard2";
import { useState } from "react";
import FormInput from "./Input";
import DropDownExercises2 from "../Form2/DropDownExercises2";

/////////////////////////////////
export default function Form() {
  // SWR Boilerplate -- loading all data
  const { data, isLoading, error } = useSWR("/api");
  const [workoutPreview, setWorkoutPreview] = useState({
    name: "Enter Name",
    exercises: [],
  });
  // setting up an array of exercises which will be handed to the preview and submission
  // atm with two empty objects
  const [formExercises, setFormExercises] = useState([{}, {}]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  // Form Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataSubmitted = Object.fromEntries(formData);
    console.log("DATA SUBMITTED", dataSubmitted);
    console.log("SUBMIT EXs count", dataSubmitted[`exercise-${1}`]);
    const newExercises = [
      dataSubmitted[`exercise-${0}`],
      dataSubmitted[`exercise-${1}`],
    ];

    const workoutFormatted = {
      name: dataSubmitted.workoutName,
      exercises: newExercises,
    };
    console.log("submitting", workoutFormatted);
    setWorkoutPreview(workoutFormatted);
  };

  ///////////////////////////////// JSX
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput name="workoutName">name of workout</FormInput>
        {formExercises.map((_, index) => (
          <DropDownExercises2
            key={index}
            data={data}
            name={`exercise-${index}`}
          >
            Exercise {index}
          </DropDownExercises2>
        ))}

        <button type="submit">submit</button>
      </form>
      {/* PREVIEW */}
      <WorkoutCard2 data={data} workout={workoutPreview} />
    </>
  );
}
