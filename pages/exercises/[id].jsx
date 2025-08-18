import Layout from "@/components/Layout";
import MuscleGroups from "@/components/MuscleGroups";
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
      <MuscleGroups muscleGroups={muscleGroups} />
      <h3>Instructions</h3>
      <ol>
        {instructions.map((step, index) => {
          return (
            <>
              <li>{step}</li>
              <br />
            </>
          );
        })}
      </ol>
    </Layout>
  );
}
