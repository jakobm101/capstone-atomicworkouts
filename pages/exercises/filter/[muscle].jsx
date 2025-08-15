import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function FilteredExercisesPage() {
  const router = useRouter();
  const muscle = router.query.muscle;
  if (!muscle) {
    return <Layout>loading</Layout>;
  }

  const {
    data: exercises,
    isLoading,
    error,
  } = useSWR(`/api/exercises/filter/${muscle}`);

  if (isLoading) {
    return;
    <Layout>
      <h2>isLoading</h2>
    </Layout>;
  }
  if (error) {
    <Layout>
      <h2>error</h2>
    </Layout>;
  }

  return (
    <Layout>
      <h2>Exercises</h2>
      <h3>Filtered by {muscle}</h3>
      {exercises.map((exercise) => {
        return (
          <Card key={exercise._id}>
            <h3>{exercise.name}</h3>
            {exercise.muscleGroups.map((muscle) => {
              return <span key={muscle}>{`_${muscle} `}</span>;
            })}
            <Link href={`/exercises/${exercise._id}`}>details</Link>
          </Card>
        );
      })}
    </Layout>
  );
}
