import { useRouter } from "next/router";
import useSWR from "swr";

export default function WorkoutDetailsPage() {
  const router = useRouter();
  const id = router.query.id;

  const { data: workout, isLoading, error } = useSWR(`/api/workouts/${id}`);
  if (isLoading) {
    <main>loading</main>;
  }
  if (error) {
    <main>error</main>;
  }

  const { name, exercises } = workout;

  return (
    <main>
      <h2>Workout Details</h2>
     <h3>name</h3> 
      {}
    </main>
  );
}
