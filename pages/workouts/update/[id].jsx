import WorkoutForm from "@/components/WorkoutForm";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function WorkoutUpdatePage() {
  const router = useRouter();
  const id = router.query.id;
  const apiUrl = `/api/workouts/${id}`;

  const { data: workout, isLoading, error, mutate } = useSWR(apiUrl);
  if (isLoading) {
    return <main>loading</main>;
  }
  if (error) {
    return <main>error</main>;
  }

  const handleUpdate = async (workoutInSubmit) => {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutInSubmit),
    });
    if (response.ok) {
      router.push(`/workouts`);
    }
  };

  return (
    <main>
      <h1>Update Workout</h1>
      <WorkoutForm onSubmit={handleUpdate} defaultValue={workout} />
      <Link href={`/`}>home</Link>
    </main>
  );
}
