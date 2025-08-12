import Link from "next/link";
import useSWR from "swr";

export default function WorkoutsPage() {
  //useSWR and handling for loading and error state
  const { data: cluster, isLoading, error } = useSWR(`/api`);
  if (isLoading) {
    return (
      <main>
        <h2>isLoading</h2>
      </main>
    );
  }
  if (error) {
    <main>
      <h2>error</h2>
    </main>;
  }

  // Variables
  const workouts = cluster.workouts;
  const exercisesCollection = cluster.exercises;

  // JSX
  return (
    <main>
      <h2>Workouts</h2>
      // mapping level 1 -- the workouts
      {workouts.map((workout) => {
        const muscleGroupsInWorkout = new Set();

        return (
          <div key={workout._id}>
            <h3>{workout.name}</h3>

            <h4>Exercises</h4>
            <ul>
              // mapping level 2 -- exercise from workouts loads details form
              the collection 'exercises'
              {workout.exercises.map((exerciseInWorkout) => {
                const exerciseInCollection = exercisesCollection.find(
                  (exercise) => exercise._id === exerciseInWorkout.exerciseId
                );
                // mapping level 3 -- musclegroups get accounted for in workout mapping(level 1)
                exerciseInCollection.muscleGroups.map((muscleGroup) =>
                  muscleGroupsInWorkout.add(muscleGroup)
                );

                return (
                  <li key={exerciseInWorkout._id}>
                    {exerciseInCollection.name}
                  </li>
                );
              })}
            </ul>

            <h4>Muscle Groups</h4>
            <ul>
              {[...muscleGroupsInWorkout].map((muscleGroup) => (
                <li>{muscleGroup}</li>
              ))}
            </ul>
            <p>—————————————————————————</p>
          </div>
        );
      })}
      <Link href={`/`}>home</Link>
    </main>
  );
}
