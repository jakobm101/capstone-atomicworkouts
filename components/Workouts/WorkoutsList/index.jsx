import List from "@/components/List";

export default function WorkoutsList() {
  // fetch cards from api
  const cards = [];
  return (
    <>
      {/* filter */}
      <List cards={cards} />
    </>
  );
}
