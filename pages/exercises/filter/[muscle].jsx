import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Link from "next/link";
import useSWR from "swr";

export default function FilteredExercisesPage() {
  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);

  if (isLoading) {
    return (
      <Layout>
        <h2>isLoading</h2>
      </Layout>
    );
  }
  if (error) {
    <Layout>
      <h2>error</h2>
    </Layout>;
  }

  return (
    <Layout>
      <h2>Exercises</h2>
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
