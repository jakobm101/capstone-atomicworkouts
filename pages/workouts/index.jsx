import Link from "next/link";
import useSWR from "swr";

export default function WorkoutsPage() {
  const { data: workouts, isLoading, error } = useSWR(`/api/workouts`);

  if (isLoading) {
    return (
      <main>
        <h2>isLoading</h2>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <h2>error</h2>
      </main>
    );
  }

  return (
    <main>
      <h2>Workouts</h2>
      {workouts.map((workout) => {
        const muscleGroupsInWorkout = new Set();

        return (
          <div key={workout._id}>
            <h3>{workout.name}</h3>

            <h4>Exercises</h4>
            <ul>
              {workout.exercises.map(({ exercise }) => {
                exercise.muscleGroups.map((muscleGroup) =>
                  muscleGroupsInWorkout.add(muscleGroup)
                );
                return (
                  <li key={exercise._id}>{exercise.name}</li>
                );
              })}
            </ul>

            <h4>Muscle Groups</h4>
            <ul>
              {[...muscleGroupsInWorkout].map((muscleGroup) => (
                <li key={muscleGroup}>{muscleGroup}</li>
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
