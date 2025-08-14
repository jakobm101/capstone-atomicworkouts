import { useState } from "react";
import useSWR from "swr";
import { uid } from "uid";

export default function WorkoutCreate() {
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: "New Workout",
    exercises: [{ _id: uid(), exercise: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // useSWR Handling
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  if (isLoading || error) {
    return <main>{error ? "error" : "loading"}</main>;
  }

  //// Submit Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
  if (isSubmitting) return;

    try {
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

      // Posting to database
      const response = await fetch(`/api/workouts`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutInSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to create workout");
      }
      router.push("/workouts");
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("Failed to create workout: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
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
              <button type="button" onClick={() => handleDeleteExercise(exerciseInWorkout)}>
                delete
              </button>
            </div>
          );
        })}
        <button type="button" onClick={handleAddExercise}>add exercise</button>
        <div>
          <p>————————</p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Submit"}
          </button>
          <button type="reset">reset</button>
        </div>
      </form>

      <p>————————————————————————————————</p>
      <h2>Preview</h2>
      {workoutPreview?.ok ? "database accepted submit" : "--"}
      <h3>{workoutSubmitted.name}</h3>
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
