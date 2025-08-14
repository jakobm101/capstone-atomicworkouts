import { useState } from "react";
import useSWR from "swr";
import { uid } from "uid";

export default function WorkoutForm({ onSubmit, workoutProp }) {
  console.log(`Form Prop exercises`, workoutProp);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: workoutProp?.name ?? "New Workout",
    exercises: workoutProp?.exercises ?? [{ _id: uid(), exercise: "" }],
  });

  // useSWR Handling
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);

  if (isLoading) {
    return <div>Loading exercises...</div>;
  }
  if (error) {
    return <div>Error loading exercises: {error.message}</div>;
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
      {/* NAME */}
      <label for="workoutName">Name</label>
      <input
        type="text"
        name="workoutName"
        placeholder="enter workout name"
        value={workoutPreview.workoutName}
        onChange={(event) => handleNameChange(event)}
      />

      {/* EXERCISES */}
      {workoutPreview.exercises.map((exerciseInWorkout, index) => {
        console.log(`mapping`, exerciseInWorkout);

        return (
          <div key={index}>
            <select
              name={`exercise-${index}`}
              value={exerciseInWorkout.exercise._id}
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

      {/* FORM BUTTONS */}
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
