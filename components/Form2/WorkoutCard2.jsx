export default function WorkoutCard2({
  data,
  workout = data.workouts.find(
    (workout) => workout._id === "68834cb36f8968f2fa09c973"
  ),
}) {
  
  console.log("workout card", workout);

  /////////////////////////////////
  return (
    <>
      <h2>{workout.name}</h2>
      <ul>
        {workout.exercises.map((exerciseInWorkout, index) => {
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
