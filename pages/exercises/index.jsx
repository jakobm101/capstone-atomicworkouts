import Link from "next/link";
import useSWR from "swr";

export default function ExercisesPage() {
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);

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

  return (
    <main>
      <h2>Exercises</h2>
      <ul>
        {exercises.map((exercise) => {
          return (
            <li>
              <h3>{exercise.name}</h3>
              {exercise.muscleGroups.map((muscle) => {
                return <span>{`_${muscle} `}</span>;
              })}
              <Link href={`/exercises/${exercise._id}`}>details</Link>
            </li>
          );
        })}
      </ul>
      <Link href={`/`}>home</Link>
      <Link href={`workouts`}>workouts</Link>
    </main>
  );
}
