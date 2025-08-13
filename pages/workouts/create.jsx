import { useState } from "react";
import useSWR from "swr";

export default function WorkoutCreate() {
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: "Preview Workout",
    exercises: [
      {
        _id: "68839ef223b65538b78a9d82",
        exercise: "6877cdddc31ed272ee80b837",
      },
      {
        _id: "68839ef223b65538b78a9d83",
        exercise: "6877cdddc31ed272ee80b83a",
      },
    ],
  });

  const [workoutSubmitted, setWorkoutSubmitted] = useState(workoutPreview);

  // useSWR Handling
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  if (isLoading || error) {
    return <main>{error ? "error" : "loading"}</main>;
  }

  //// Submit Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newExercisesList = workoutPreview.exercises.map((_, index) => {
      return { exercise: data[`exercise-${index}`] };
    });

    const workoutInSubmit = {
      name: data.workoutName,
      exercises: newExercisesList,
    };

    // updating
    setWorkoutSubmitted(workoutInSubmit);

    // Posting to database
    const response = await fetch(`/api/workouts`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutInSubmit),
    });
    e.target.reset();
    setWorkoutPreview({ ...workoutPreview, ok: response.ok });
  };

  const handleSelect = (id, selectedExercise) => {
    console.log("handle select id", id);
    let newExercises = workoutPreview.exercises.map((exercise) =>
      exercise._id === id
        ? { ...exercise, exercise: selectedExercise }
        : exercise
    );

    setWorkoutPreview({
      ...workoutPreview,
      exercises: newExercises,
    });
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
        {workoutPreview.exercises.map((exerciseInWorkout, index) => {
          return (
            <div key={index}>
              <select
                name={`exercise-${index}`}
                value={exerciseInWorkout.exercise}
                onChange={(event) =>
                  handleSelect(exerciseInWorkout._id, event.target.value)
                }
              >
                {exercises.map(({ _id, name: exerciseName }) => {
                  return (
                    <option value={_id} key={_id}>
                      {exerciseName}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
        <div>
          <p>————————</p>
          <button type="submit">submit</button>
          <button type="reset">reset</button>
        </div>
      </form>

      <p>————————————————————————————————</p>
      <h2>Preview</h2>
      {workoutPreview?.ok ? "database accepted submit" : "--"}
      <h3>{workoutSubmitted.workoutName}</h3>
      {workoutSubmitted.exercises.map((exercise, index) => {
        const { name } = exercises.find(
          (exerciseInCollection) =>
            exerciseInCollection._id === exercise.exercise
        );

        return (
          <div key={index}>
            <h2>{name}</h2>
          </div>
        );
      })}
    </main>
  );
}
