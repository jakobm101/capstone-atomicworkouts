import { useState } from "react";

export default function WorkoutCreate() {
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: "Preview Workout",
    exercises: [{}, {}],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitting", data);
    setWorkoutPreview({ ...workoutPreview, ...data });
  };

  console.log("workout preview", workoutPreview);

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
    </main>
  );
}
