/***
 *
 * TASKS:
 * - list of exercises that does not crash
 * - submitting works with dynamic amount of exercises
 * - deleting resets the exercise selections
 */
import useSWR from "swr";
import WorkoutCard2 from "../Form2/WorkoutCard2";
import { useState } from "react";
import FormInput from "./Input";
import DropDownExercises2 from "../Form2/DropDownExercises2";
import { uid } from "uid";

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
  const [formExercises, setFormExercises] = useState([
    { formId: 0 },
    { formId: 1 },
  ]);
  const addExercise = () =>
    setFormExercises([...formExercises, { formId: uid() }]);
  const deleteExercise = (id) => {
    console.log("delete", id);

    setFormExercises(
      formExercises.filter((exercise) => exercise.formId !== id)
    );
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  // Form Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataSubmitted = Object.fromEntries(formData);
    console.log("SUBMISSION", dataSubmitted);

    const newExercises = formExercises.map((formExercise) => {
      return { exerciseId: dataSubmitted[formExercise.formId] };
    });

    const workoutFormatted = {
      name: dataSubmitted.workoutName,
      exercises: newExercises,
    };
    setWorkoutPreview(workoutFormatted);
  };

  ///////////////////////////////// JSX
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput name="workoutName">name of workout</FormInput>
        {formExercises.map((formExercise) => (
          <>
            <DropDownExercises2
              key={formExercise.formId}
              data={data}
              name={formExercise.formId}
            >
              Exercise {formExercise.formId}
            </DropDownExercises2>
            <button onClick={() => deleteExercise(formExercise.formId)}>
              delete
            </button>
          </>
        ))}
        <button onClick={addExercise}>add exercise</button>

        <button type="submit">submit</button>
      </form>
      {/* PREVIEW */}
      <WorkoutCard2 data={data} workout={workoutPreview} />
    </>
  );
}
