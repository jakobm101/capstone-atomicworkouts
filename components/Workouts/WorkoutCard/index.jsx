export default function WorkoutCard({ workout, exercises }) {
    
  return (
    <>
      <h3>{workout.name}</h3>
      <ul>
        {exercises.map((exercise, index) => {
          return (
            <li key={index}>
              {exercise.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
