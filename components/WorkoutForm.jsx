import { useState } from "react";
import useSWR from "swr";
import { uid } from "uid";

export default function WorkoutForm({ onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: "New Workout",
    exercises: [{ _id: uid(), exercise: "" }],
  });

  // useSWR Handling
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  if (isLoading || error) {
    return <main>{error ? "error" : "loading"}</main>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newExercisesList = workoutPreview.exercises.map((_, index) => {
      return { exercise: data[`exercise-${index}`] };
    });

    const workoutInSubmit = {
      name: data.workoutName,
      exercises: newExercisesList,
    };
    onSubmit(workoutInSubmit);
  };

  const handleSelect = (id, selectedExercise) => {
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

  const handleDeleteExercise = ({ _id }) => {
    const newExercises = workoutPreview.exercises.filter(
      (exercise) => exercise._id !== _id
    );
    setWorkoutPreview({ ...workoutPreview, exercises: newExercises });
  };

  const handleAddExercise = () => {
    const newExercises = [
      ...workoutPreview.exercises,
      { _id: uid(), exercise: "" },
    ];
    setWorkoutPreview({ ...workoutPreview, exercises: newExercises });
  };

  const handleNameChange = (event) => {
    setWorkoutPreview({ ...workoutPreview, workoutName: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="workoutName">Name</label>
      <input
        type="text"
        name="workoutName"
        placeholder="enter workout name"
        value={workoutPreview.workoutName}
        onChange={(event) => handleNameChange(event)}
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
              required
            >
              <option value="">Select exercise</option>
              {exercises.map(({ _id, name: exerciseName }) => {
                return (
                  <option value={_id} key={_id}>
                    {exerciseName}
                  </option>
                );
              })}
            </select>
            <button
              type="button"
              onClick={() => handleDeleteExercise(exerciseInWorkout)}
            >
              delete
            </button>
          </div>
        );
      })}
      <button type="button" onClick={handleAddExercise}>
        add exercise
      </button>
      <div>
        <p>————————</p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Submit"}
        </button>
        <button type="reset">reset</button>
      </div>
    </form>
  );
}
