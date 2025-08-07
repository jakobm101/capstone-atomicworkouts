export default function DropDownExercises2({ children, data, name }) {
  console.log("DD#E2", data);

  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <select name={name} id={name}>
        {data.exercises.map((exercise) => (
          <option value={exercise._id} key={exercise._id}>
            {exercise.name}
          </option>
        ))}
      </select>
    </div>
  );
}
