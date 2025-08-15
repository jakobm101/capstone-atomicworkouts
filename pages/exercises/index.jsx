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
              <MuscleArticle>
                <StyledH5>Muscle Groups</StyledH5>
                <MuscleWrapper>
                  {exercise.muscleGroups.map((muscle) => (
                    <Muscle key={muscle}>{muscle}</Muscle>
                  ))}
                </MuscleWrapper>
              </MuscleArticle>
              <StyledLink href={`/exercises/${exercise._id}`}>
                details
              </StyledLink>
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
  border: 1px solid var(--color-orange-0);
  border-radius: 2px;
  padding: 4px 8px;
  margin: 0 4px 4px 0;
`;

const MuscleArticle = styled.article`
  display: flex;
  flex-flow: row;
`;

const MuscleWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 10px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  border-left: 1px solid var(--color-orange-10);
  margin-bottom: 32px;
  padding-left: 8px;
`;

const StyledH2 = styled.h2`
  position: sticky;
  top: 8px;
`;

const StyledH5 = styled.h5`
  min-width: max-content;
`;
const StyledLink = styled(Link)`
  border: 1px solid var(--color-orange-5);
  border-radius: 4px;
  padding: 4px 8px 8px 8px;
`;
