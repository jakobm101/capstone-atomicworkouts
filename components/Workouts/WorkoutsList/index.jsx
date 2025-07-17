import List from "@/components/List";
import useSWR from "swr";

export default function WorkoutsList() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data:workouts, isLoading, error } = useSWR(`/api/workouts/`, fetcher);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;
  if (!workouts) return <h2>Empty database</h2>

  return (
    <>
      <List objectList={workouts} />
    </>
  );
}
