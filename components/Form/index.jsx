import useSWR from "swr";
import SimpleWorkoutDisplay from "../Form2/SimpleWorkoutDisplay";

/////////////////////////////////
export default function Form() {
  // SWR Boilerplate -- loading all data
  const { data, isLoading, error } = useSWR("/api");
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;



  ///////////////////////////////// JSX
  return (
    <>
      <SimpleWorkoutDisplay data={data} />
    </>
  );
}
