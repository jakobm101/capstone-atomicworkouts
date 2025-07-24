import { Delete } from "lucide-react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function ButtonDelete({ id }) {
  const { push, reload, pathname } = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await push(`/`);
        if (pathname === `/`) reload();
      } else {
        console.error("Error while deleting", await response.text());
      }
    } catch (error) {}
    console.error("Connection error");
  };
  return <StyledDelete onClick={handleDelete} />;
}

const StyledDelete = styled(Delete)`
  cursor: pointer;
  &:hover {
    color: var(--color-contrast);
  }
`;
