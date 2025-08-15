import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
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
      <h2>Filtered by {muscle}</h2>
      <p>{exercises?.length ?? "no"} exercises found </p>
      {exercises?.length ? (
        <h3>Exercises</h3>
      ) : (
        <Card>
          <StyledLink href={`/exercises`}>Check out all Exercises</StyledLink>
        </Card>
      )}
      {exercises?.map((exercise) => {
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

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
`;
