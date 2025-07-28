import { Delete } from "lucide-react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function ButtonDelete({ id, onDelete }) {
  const { pathname, push } = useRouter();
  const handleDelete = async (e) => {
    // prevents that a wrapping link gets fired
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // calls parent function that hides the card in the front end
        if (onDelete) onDelete(e);
        if (pathname === `/workouts/[id]`) await push(`/`);
      } else {
        console.error("Error while deleting", await response.text());
      }
    } catch (error) {}
    console.error("Connection error");
  };
  return <StyledDelete onClick={handleDelete} />;
}

const StyledDelete = styled(Delete)`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  &:hover {
    color: var(--color-contrast);
  }
`;
