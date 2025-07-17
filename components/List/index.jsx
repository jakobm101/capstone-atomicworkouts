import WorkoutCard from "../Workouts/WorkoutCard";

export default function List({ objectList }) {
    console.log(objectList);
    
  if (!objectList) {
    return "loading";
  }
  return (
    <>
      {/* add logic for mapping ExerciseCards */}
      {objectList.map((workout, index) => (
        <WorkoutCard key={index} workout={workout} />
      ))}
    </>
  );
}
