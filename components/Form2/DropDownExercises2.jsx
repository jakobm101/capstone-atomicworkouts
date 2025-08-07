export default function DropDownExercises2({ children, data, name }) {

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
