import WorkoutCard from "../Workouts/WorkoutCard";
import useSWR from "swr";

export default function List({ objectList }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: exercises,
    isLoading,
    error,
  } = useSWR(`/api/exercises/`, fetcher);
  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;
  if (!objectList) {
    return "loading";
  }

  const sampleWorkExIds = objectList[0].exercises.map((e) => e._id)
  console.log(sampleWorkExIds);
  console.log(exercises[1]._id);
  console.log(exercises.filter(x => x._id in objectList[1].exercises.map(e => e._id)));
  
  

  return (
    <>
      {objectList.map((workout, index) => (
        <WorkoutCard
          key={index}
          workout={workout}
          exercises={exercises.filter(
            (ex) => ex._id in workout.exercises.map((exer) => exer._id)
          )}
        />
      ))}
    </>
  );
}
