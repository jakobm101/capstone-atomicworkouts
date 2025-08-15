import Card from "@/components/Card";
import Layout from "@/components/Layout";
import libMusclegroups from "@/lib/musclegroups";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
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
      <StyledH2>Exercises{filter ? `: ${filter}` : ``}</StyledH2>
      <FilterWrapper>
        <h3>Filter</h3>
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
      </FilterWrapper>

      {filteredExercises?.length ? (
        <>
          {filteredExercises.map((exercise) => (
            <Card key={exercise._id}>
              <h3>{exercise.name}</h3>
              <MuscleWrapper>
                <h4>Muscle Groups</h4>
                {exercise.muscleGroups.map((muscle) => (
                  <Muscle key={muscle}>{muscle}</Muscle>
                ))}
              </MuscleWrapper>
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

const Muscle = styled.div`
  display: inline-block;
  font-size: small;
  border: 1px solid var(--color-orange-5);
  padding: 4px 8px;
  margin: 0 4px 4px 0;
`;

const MuscleWrapper = styled.div`
  margin-bottom: 10px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  border-bottom: 1px solid var(--color-orange-5);
  margin-bottom: 8px;
`;

const StyledH2 = styled.h2`
  position: sticky;
  top: 8px;
`;
