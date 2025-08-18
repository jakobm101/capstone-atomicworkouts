import styled from "styled-components";

export default function MuscleGroups({ muscleGroups }) {
  return (
    <MuscleArticle>
      <StyledH5>Muscle Groups</StyledH5>
      <MuscleWrapper>
        {muscleGroups.map((muscle) => (
          <Muscle key={muscle}>{muscle}</Muscle>
        ))}
      </MuscleWrapper>
    </MuscleArticle>
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

const StyledH5 = styled.h5`
  min-width: max-content;
`;
