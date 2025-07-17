import WorkoutCard from "../Workouts/WorkoutCard";
import useSWR from "swr";

export default function List({ objectList }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: exercises,
    isLoading,
    error,
  } = useSWR(`/api/exercises/`, fetcher);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;
  if (!objectList) {
    return "loading";
  }

  return (
    <>
      {/* add logic for mapping ExerciseCards */}
      {objectList.map((workout, index) => (
        <WorkoutCard
          key={index}
          workout={workout}
          exercises={exercises}
        />
      ))}
    </>
  );
}
