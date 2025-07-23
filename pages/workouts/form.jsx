import Heading from "@/components/Atoms/Text/Heading";
import Form from "@/components/Form";
import styled from "styled-components";

export default function FormPage() {
  return (
    <main>
      <Header>atomic workouts</Header>
      <Heading>Form</Heading>
      <Form />
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
