import { useState } from "react";
import useSWR from "swr";

export default function WorkoutCreate() {
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: "Preview Workout",
    exercises: [
      {
        _id: "68839ef223b65538b78a9d82",
        exerciseId: "6877cdddc31ed272ee80b837",
        sets: 4,
        reps: 12,
      },
      {
        _id: "68839ef223b65538b78a9d83",
        exerciseId: "6877cdddc31ed272ee80b83a",
        sets: 4,
        reps: 12,
      },
    ],
  });
  // useSWR Handling
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  if (isLoading || error) {
    return <main>{error ? "error" : "loading"}</main>;
  }

  // Submit Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitting", data);
    setWorkoutPreview({ ...workoutPreview, ...data });
  };

  // JSX Main
  return (
    <main>
      <h1>Creating Workout</h1>
      <form onSubmit={handleSubmit}>
        <label for="workoutName">Name</label>
        <input
          type="text"
          name="workoutName"
          placeholder="enter workout name"
        />
        {workoutPreview.exercises.map((exercise, index) => {
          const exerciseDetails = exercises.find(
            (exerciseInCollection) => exerciseInCollection._id === exercise._id
          );
          console.log(exercises[0]);
          console.log("ex id", exercise);

          return (
            <div key={index}>
              <h2>{exercise._id}</h2>
            </div>
          );
        })}
        <div>
          <p>————————</p>
          <button type="submit">submit</button>
        </div>
      </form>

      <p>————————————————————————————————</p>
      <h2>Preview</h2>
      <h3>{workoutPreview.workoutName}</h3>
      {workoutPreview.exercises.map((exercise, index) => {
        return (
          <div key={index}>
            <p>exercise</p>
          </div>
        );
      })}
    </main>
  );
}
