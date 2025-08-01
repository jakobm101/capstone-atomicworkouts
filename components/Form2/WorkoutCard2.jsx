export default function WorkoutCard2({ data, workoutToDisplay }) {
  let workoutDisplayed = data.workouts.find(
    (workout) => workout._id === "68834cb36f8968f2fa09c973"
  );
  if (workoutToDisplay) workoutDisplayed = workoutToDisplay;
  /////////////////////////////////
  return (
    <>
      <h2>{workoutDisplayed.name}</h2>
      <ul>
        {workoutDisplayed.exercises.map((exerciseInWorkout, index) => {
          const idInWorkouts = exerciseInWorkout.exerciseId;
          const exerciseInCollection = data.exercises.find(
            (exerciseInCollection) => exerciseInCollection._id === idInWorkouts
          );
          return <li key={index}>{exerciseInCollection.name}</li>;
        })}
      </ul>
    </>
  );
}
