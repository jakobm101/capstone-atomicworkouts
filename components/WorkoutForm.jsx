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


export default function WorkoutForm({ ...props }) {
  return <h2>Workout Form</h2>;
}
