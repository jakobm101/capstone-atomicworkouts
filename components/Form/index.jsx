import useSWR from "swr";
import WorkoutCard from "../Workouts/WorkoutCard";

/////////////////////////////////
export default function Form() {
  // SWR Boilerplate -- loading all data
  const { data, isLoading, error } = useSWR("/api");
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  // trying to use data
  const baselineWorkout = data.workouts[0];
  const baselineExerciseId = baselineWorkout.exercises[0].exerciseId;
  const baselineExercise = data.exercises.find(
    (exercise) => exercise._id === baselineExerciseId
  );

  // creating default workout
  const newWorkout = { ...data.workouts[0], name: "New Workout" };
  console.log("API Response:", newWorkout);
  
  // finding specific workout
  const workoutDisplayed = data.workouts.find(
    (workout) => workout._id === "68834cb36f8968f2fa09c973"
  );
  
  

  ///////////////////////////////// JSX
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
      <WorkoutCard />
    </>
  );
}
