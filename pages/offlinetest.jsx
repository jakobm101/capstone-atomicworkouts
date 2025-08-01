import Card from "@/components/Atoms/Card";
import useSWR from "swr";

export default function Update() {
  const { data: workouts, isLoading, error } = useSWR(`/api/offline/workouts`);
  if (isLoading || error) {
    return <Card>loading or error</Card>;
  }
  console.log(workouts.exercises[0]._id);
  return (
    <>
      <h1>update</h1>
      {workouts?.workouts.map((workout) => {
        return (
          <Card key={workout._id}>
            <p>{workout.name}</p>
            {workout.exercises.map((workoutExerciseInfo) => (
              <p key={workoutExerciseInfo._id}>
                {
                  workouts.exercises.find(
                    (exerciseInExercises) =>
                      exerciseInExercises._id === workoutExerciseInfo.exerciseId
                  ).name
                }
              </p>
            ))}
          </Card>
        );
      })}
    </>
  );
}
