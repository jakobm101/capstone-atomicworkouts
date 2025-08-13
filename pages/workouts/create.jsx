import { useState } from "react";

export default function WorkoutCreate() {
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: "Preview Workout",
    exercises: [
      {
        exercise: "19",
        sets: 4,
        reps: 12,
      },
      {
        exercise: "17",
        sets: 4,
        reps: 10,
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitting", data);
    setWorkoutPreview({ ...workoutPreview, ...data });
  };

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
