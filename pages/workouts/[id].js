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
    return "error";
  }
  const workout = workoutData.workout;

  return (
    <>
      <WorkoutCard workout={workout} />
    </>
  );
}
