import List from "@/components/List";
import useSWR from "swr";

export default function WorkoutsList() {
  // fetch cards from api
  const { data } = useSWR(`/api/workouts/`, (url) => fetch(url).then(res => res.json()))
  console.log(data);
  
  const cards = [];
  return (
    <>
      {/* filter */}
      <List cards={cards} />
    </>
  );
}
