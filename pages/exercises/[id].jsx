import { useRouter } from "next/router";
import useSWR from "swr";

export default function ExerciseDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  const {
    data: exercise,
    isLoading,
    error,
  } = useSWR(id ? `/api/exercises/${id}` : null);

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
  console.log(exercise);

  return (
    <main>
      <h1>Details</h1>
    </main>
  );
}
