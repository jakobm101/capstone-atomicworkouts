/***
 *
 * TASKS:
 * - list of exercises that does not crash
DONE * - submitting works with dynamic amount of exercises
DONE * - deleting resets the exercise selections
DONE * - new bug: changing selection makes exercises swap places
DONE - rename 'data' to less generic name like at least 'database' or 'cluster'
- test updating clusters with api
- 
DONE - Submitting adds new workout to database

Prop and SWR plan:
all SWR in this top level
- move swr from workoutCard to here -> WorkoutCard2 works
- move swr from dropdown to here -> DropDown2 basic features work

-

 */

import useSWR from "swr";
import WorkoutCard2 from "../../Form2/WorkoutCard2";
import { useEffect, useState } from "react";
import FormInput from ".././Input";
import DropDownExercises2 from "../../Form2/DropDownExercises2";
import { uid } from "uid";

/////////////////////////////////
export default function FormUpdate({ workoutId }) {
  // SWR Boilerplate -- loading all data
  const { data: cluster, isLoading, error } = useSWR("/api");

  // For Preview Generation
  const [workoutPreview, setWorkoutPreview] = useState({
    name: "Enter Name",
    exercises: [],
  });

  // EXERCISE HANDLING
  // setting up an array of exercises which will be handed to the preview and submission
  // atm with two empty objects

  const [formExercises, setFormExercises] = useState([
    { formId: 2, selection: "6877cdddc31ed272ee80b840" },
    { formId: 3, selection: "6877cdddc31ed272ee80b837" },
  ]);

  useEffect(() => {
    if (cluster) {
      const loadingWorkout = cluster.workouts.find(
        (workout) => workout._id === workoutId
      );
      setWorkoutPreview(loadingWorkout);
      setFormExercises(loadingWorkout.exercises);
    }
  }, [workoutId]);

  const addExercise = () =>
    setFormExercises([...formExercises, { formId: uid() }]);

  const handleChangeExercise = (e, id) => {
    const newEx = formExercises.find(
      (formExercise) => formExercise.formId === id
    );
    newEx[`selection`] = e.target.value;
    const newExes = formExercises.map((formEx) => {
      return formEx.formId === id ? newEx : formEx;
    });
    setFormExercises([...newExes]);
  };

  const deleteExercise = (id) =>
    setFormExercises(
      formExercises.filter((exercise) => exercise.formId !== id)
    );

  // SWR SAFEGUARDS
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  // SUBMIT
  // Form Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataSubmitted = Object.fromEntries(formData);

    const newExercises = formExercises.map((formExercise) => {
      return {
        exerciseId: dataSubmitted[formExercise.formId],
      };
    });

    const workoutFormatted = {
      name: dataSubmitted.workoutName,
      exercises: newExercises,
    };

    // api call

    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutFormatted),
    });
    if (!response.status === "ok") {
      console.log("API response not ok", response.status);
    }

    // optimistic update
    setWorkoutPreview(workoutFormatted);
  };

  ///////////////////////////////// JSX
  return (
    <>
      <h2>Create Workout</h2>
      <form onSubmit={handleSubmit}>
        <FormInput name="workoutName" value={workoutPreview.name}>
          name of workout
        </FormInput>
        {formExercises.map((formExercise) => (
          <>
            <DropDownExercises2
              key={formExercise.formId}
              data={cluster}
              name={formExercise.formId}
              selection={formExercise.selection}
              onChange={handleChangeExercise}
            >
              Exercise {formExercise.formId}
            </DropDownExercises2>
            <button onClick={() => deleteExercise(formExercise.formId)}>
              delete
            </button>
          </>
        ))}
        <hr />
        <div>
          <button onClick={addExercise}>add exercise</button>

          <button type="submit">submit</button>
        </div>
      </form>
      <h2>Preview</h2>
      <WorkoutCard2 data={cluster} workout={workoutPreview} />
    </>
  );
}
