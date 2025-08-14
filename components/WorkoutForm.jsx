import useSWR from "swr";
import { uid } from "uid";

/**
 * 
 * 
 * Do this:

Make components/WorkoutForm.jsx.
Move all the form stuff in there:
- HTML Form (inputs, selects, buttons)
- State (workoutPreview, isSubmitting)
- Functions (handleAddExercise, handleDeleteExercise, etc.)
- BUT NO database calls inside of WorkoutForm.jsx
- Make it flexible with props:



// New workout in your `create.js`
<WorkoutForm onSubmit={handleCreateWorkout} />

// Edit workout in your `edit/[id].js` (later!)
<WorkoutForm initialData={existingWorkout} onSubmit={updateWorkout} />
In your WorkoutForm.jsx just call the onSubmit prop with the prepared data await onSubmit(workoutInSubmit);

In the create page, replace all the messy form code with:

<WorkoutForm onSubmit={handleCreateWorkout} />
In the create page's handleCreateWorkout function that's where all the database logic goes:

  const handleCreateWorkout = async (workoutData) => {
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData)
      });
      
      if (!response.ok) throw new Error('Failed to create');
      
      router.push('/workouts');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

 */

export default function WorkoutForm({
  isSubmitting,
  onSubmit,
  workoutPreview,
  setWorkoutPreview
}) {
  // useSWR Handling
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  if (isLoading || error) {
    return <main>{error ? "error" : "loading"}</main>;
  }

  //// Submit Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    onSubmit(e);
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

  // JSX
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
