import Heading from "@/components/Atoms/Text/Heading";
import Link from "next/link";
import useSWR from "swr";
import ExerciseCard from "../ExerciseCard";

export default function ExerciseList() {
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;
  if (!exercises) return <h2>Empty database</h2>;

  return (
    <>
      <Link href="/">Workouts</Link>
      <Heading>Exercises</Heading>
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise._id} exercise={exercise} />
      ))}
    </>
  );
}
