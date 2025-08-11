import Card from "@/components/Atoms/Card";
import FormUpdate from "@/components/Form/FormUpdate";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function FormPageUpdate() {
  const { query } = useRouter();
  if (!query.id) return <Card>Loading</Card>;

  return (
    <main>
      <Header>atomic workouts</Header>
      <FormUpdate workoutId={query.id} />
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
