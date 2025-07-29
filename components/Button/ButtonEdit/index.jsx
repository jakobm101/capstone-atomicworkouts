import { Wrench } from "lucide-react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mutate } from "swr";

export default function ButtonEdit({ id }) {
  const { push } = useRouter();
  const handleEdit = async (e) => {
    // prevents that a wrapping link gets fired
    e.stopPropagation();
    e.preventDefault();
    mutate(`/api/workouts/${id}`);
    push(`/workouts/form/${id}`);
  };
  return <StyledEdit onClick={handleEdit} aria-label="Edit workout" />;
}

const StyledEdit = styled(Wrench)`
  position: absolute;
  top: 42px;
  right: 12px;
  cursor: pointer;
  &:hover {
    color: var(--color-contrast);
  }
`;
