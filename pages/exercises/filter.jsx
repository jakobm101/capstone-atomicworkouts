import Card from "@/components/Card";
import Layout from "@/components/Layout";
import libMusclegroups from "@/lib/musclegroups";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function ExercisesPage() {
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

  const [filter, setFilter] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFilter(e.target.muscle.value);
  };

  return (
    <Layout>
      <h2>Filter</h2>
      <form onSubmit={handleSubmit}>
        <select name="muscle" id="muscle">
          <option value={null}>Sort by muscle group</option>
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
        if (!filter || exercise.muscleGroups.includes(filter)) {
          return (
            <Card key={exercise._id}>
              <h3>{exercise.name}</h3>
              {exercise.muscleGroups.map((muscle) => {
                return <span key={muscle}>{`_${muscle} `}</span>;
              })}
              <Link href={`/exercises/${exercise._id}`}>details</Link>
            </Card>
          );
        }
      })}
    </Layout>
  );
}
