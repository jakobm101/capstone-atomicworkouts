import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ExerciseDetailsPage() {
  // api and router
  const router = useRouter();
  const { id } = router.query;
  const {
    data: exercise,
    isLoading,
    error,
  } = useSWR(id ? `/api/exercises/${id}` : null);

  //swr error handling
  if (isLoading || !exercise) {
    return (
      <main>
        <h2>loading</h2>
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

  // variables
  const { name, muscleGroups, instructions } = exercise;

  // main JSX
  return (
    <main>
      <h1>Exercise Details</h1>
      <h2>{name}</h2>
      <h3>Instructions</h3>
      <ol>
        {instructions.map((paragraph, index) => (
          <li key={index}>{paragraph}</li>
        ))}
      </ol>
      <h3>Muscle Groups</h3>
      <ul>
        {muscleGroups.map((muscle) => (
          <span>{`_${muscle} `}</span>
        ))}
      </ul>
      <h2>----</h2>
      <Link href={`/`}>home</Link>
      <Link href={`/exercises`}>Exercises</Link>
      <Link href={`/workouts`}>Workouts</Link>
    </main>
  );
}
