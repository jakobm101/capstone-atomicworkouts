import Card from "@/components/Card";
import Layout from "@/components/Layout";
import libMusclegroups from "@/lib/musclegroups";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ExercisesPage() {
  const router = useRouter();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const muscle = e.target.muscle.value;
    muscle && router.push(`/exercises/filter/${muscle}`);
  };

  return (
    <Layout>
      <h2>Filter</h2>
      <form onSubmit={handleSubmit}>
        <select name="muscle" id="muscle" required>
          <option value="">Sort by muscle group</option>
          {libMusclegroups.map((muscle) => {
            return (
              <option key={muscle} value={muscle}>
                {muscle}
              </option>
            );
          })}
        </select>
        <button type="submit">submit</button>
      </form>
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
