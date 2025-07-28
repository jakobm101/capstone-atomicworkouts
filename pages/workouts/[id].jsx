import ButtonClose from "@/components/Button/ButtonClose";
import WorkoutCard from "@/components/Workouts/WorkoutCard";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function WorkoutDetails() {
  const { query } = useRouter();
  const {
    data: workoutData,
    isLoading,
    error,
  } = useSWR(`/api/workouts/${query.id}`);
  if (isLoading) {
    return "loading";
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const workout = workoutData.workout;

  return (
    <main>
      <ButtonClose href={`/`} />
      <WorkoutCard workout={workout} />
    </main>
  );
}
