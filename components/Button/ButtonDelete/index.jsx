import { Delete } from "lucide-react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ButtonDelete({ id }) {
  const { push, query } = useRouter();
  const { mutate } = useSWR();
  const handleDelete = async () => {
    const response = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) push(`/`);
    console.log(query);
  };
  return <Delete onClick={handleDelete} />;
}
