import Layout from "@/components/Layout";
import MuscleGroups from "@/components/MuscleGroups";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function ExerciseDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const id = router.query.id;
  const { data: exercise, isLoading, error } = useSWR(`/api/exercises/${id}`);
  if (isLoading || error || !session) {
    return (
      <Layout>
        <h1>
          {!session
            ? "Please log in to view exercise details (next auth demo)"
            : isLoading
              ? `loading`
              : `error`}
        </h1>
      </Layout>
    );
  }
  const { name, instructions, muscleGroups } = exercise;

  return (
    <Layout>
      <h1>Exercise Details</h1>
      <h2>{name}</h2>
      <MuscleGroups muscleGroups={muscleGroups} />
      <h3>Instructions</h3>
      <ol>
        {instructions.map((step) => {
          return <li key={step}>{step}</li>;
        })}
      </ol>
    </Layout>
  );
}
