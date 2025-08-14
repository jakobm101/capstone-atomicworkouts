import WorkoutForm from "@/components/WorkoutForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function WorkoutUpdatePage() {
  const router = useRouter();
  const id = router.query.id;
  const { data: workout, isLoading, error } = useSWR(`/api/workouts/${id}`);
  if (isLoading) {
    return <main>loading</main>;
  }
  if (error) {
    return <main>error</main>;
  }

  const handleChange = async () => {
    console.log(`changing`);
  };

  return (
    <main>
      <h1>Edit Workout</h1>
      <WorkoutForm onSubmit={handleChange} workoutProp={workout} />
    </main>
  );
}
