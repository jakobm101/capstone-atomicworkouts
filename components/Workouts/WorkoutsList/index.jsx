import Heading from "@/components/Atoms/Text/Heading";
import List from "@/components/List";
import useSWR from "swr";

export default function WorkoutsList() {
  const {
    data: workouts,
    isLoading,
    error,
  } = useSWR(`/api/workouts`);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;
  if (!workouts) return <h2>Empty database</h2>;

  return (
    <>
      <Heading>Workouts</Heading>
      <List workouts={workouts} />
    </>
  );
}
