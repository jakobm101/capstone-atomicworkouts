import Card from "@/components/Atoms/Card";
import Form from "@/components/Form";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

export default function FormPageUpdate() {
  const { query } = useRouter();

  const {
    data: workout,
    isLoading,
    error,
  } = useSWR(`/api/workouts/${query.id}`);
  if (isLoading || error) {
    return (
      <main>
        <Card>
          {isLoading && "Loading"}
          {error && "ERROR >> Call to database failed"}
        </Card>
      </main>
    );
  }
  return (
    <main>
      <Header>atomic workouts</Header>
      <Form workout={workout.workout} />
    </main>
  );
}

const Header = styled.h3`
  position: sticky;
  font-size: 8px;
  top: 10px;
  left: 10px;
  z-index: 10;
`;
