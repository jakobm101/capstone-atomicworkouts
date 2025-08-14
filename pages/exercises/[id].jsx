import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ExerciseDetailsPage() {
  const router = useRouter();
  const id = router.query.id;
  const { data: exercise, isLoading, error } = useSWR(`/api/exercises/${id}`);
  if (isLoading || error) {
    return (
      <Layout>
        <h1>{error ? `error` : `loading`}</h1>
      </Layout>
    );
  }
  const { name, instructions, muscleGroups, _id } = exercise;

  return (
    <Layout>
      <h1>Exercise Details</h1>
      <h2>{name}</h2>
      <h3>Instructions</h3>
      {instructions.map((step, index) => {
        return (
          <div key={step}>
            <h4>{index + 1}</h4>
            <p>{step}</p>
          </div>
        );
      })}
      <h3>Muscle Groups</h3>
      <ul>
        {muscleGroups.map((muscle) => {
          return <li key={muscle}>{muscle}</li>;
        })}
      </ul>
      <p>————————</p>
      <Link href={`/`}>home</Link>
      <Link href={`/exercises`}>exercises</Link>
      <Link href={`/workouts`}>workouts</Link>
    </Layout>
  );
}
