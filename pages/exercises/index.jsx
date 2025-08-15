import Card from "@/components/Card";
import Layout from "@/components/Layout";
import libMusclegroups from "@/lib/musclegroups";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function ExercisesPage() {
  const [filter, setFilter] = useState();
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

const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredExercises = exercises?.filter(
    (exercise) => !filter || exercise.muscleGroups.includes(filter)
  );

  return (
    <Layout>
      <h2>Filter</h2>
      <select onChange={handleFilterChange} value={filter || ""}>
        <option value="">Show all exercises</option>
        {libMusclegroups.map((muscle) => {
          return (
            <option key={muscle} value={muscle}>
              {muscle}
            </option>
          );
        })}
      </select>

      <p>{filteredExercises?.length ?? "no"} exercises found</p>

      {filteredExercises?.length ? (
        <>
          <h2>Exercises</h2>
          {filteredExercises.map((exercise) => (
            <Card key={exercise._id}>
              <h3>{exercise.name}</h3>
              {exercise.muscleGroups.map((muscle) => (
                <span key={muscle}>{`_${muscle} `}</span>
              ))}
              <Link href={`/exercises/${exercise._id}`}>details</Link>
            </Card>
          ))}
        </>
      ) : (
        <Card>
          <p>No exercises found for this muscle group</p>
        </Card>
      )}
    </Layout>
  );
}
