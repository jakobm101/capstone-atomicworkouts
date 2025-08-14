import Layout from "@/components/Layout";
import { collectMuscleGroups } from "@/lib/utils";
import Link from "next/link";
import useSWR from "swr";

export default function WorkoutsPage() {
  const { data: workouts, isLoading, error } = useSWR(`/api/workouts`);

  if (isLoading) {
    return (
      <Layout>
        <h2>isLoading</h2>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <h2>error</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>Workouts</h2>
      {workouts.map((workout) => {
        const muscleGroupsInWorkout = collectMuscleGroups(workout.exercises);

        return (
          <div key={workout._id}>
            <h3>{workout.name}</h3>

            <h4>Exercises</h4>
            <ul>
              {workout.exercises.map(({ exercise }) => {
                return <li key={exercise._id}>{exercise.name}</li>;
              })}
            </ul>

            <h4>Muscle Groups</h4>
            <ul>
              {[...muscleGroupsInWorkout].map((muscleGroup) => (
                <li key={muscleGroup}>{muscleGroup}</li>
              ))}
            </ul>
            <Link href={`/workouts/${workout._id}`}>Details</Link>
            <p>—————————————————————————</p>
          </div>
        );
      })}
      <Link href={`/`}>home</Link>
      <Link href={`/workouts/create`}>add new workout</Link>
    </Layout>
  );
}
