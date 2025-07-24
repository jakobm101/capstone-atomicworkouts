import { Delete } from "lucide-react";
import { useRouter } from "next/router";

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
  return <Delete onClick={handleDelete} />;
}
