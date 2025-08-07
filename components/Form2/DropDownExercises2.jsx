export default function DropDownExercises2({
  children,
  data,
  name,
  onChange,
  selection,
}) {
  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <select name={name} id={name} onChange={(e) => onChange(e, name)}>
        {data.exercises.map((exercise) => (
          <option
            value={exercise._id}
            key={exercise._id}
            selected={exercise._id === selection}
          >
            {exercise.name}
          </option>
        ))}
      </select>
    </div>
  );
}
