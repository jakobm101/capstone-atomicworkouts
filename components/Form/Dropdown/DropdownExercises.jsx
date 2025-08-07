export default function DropdownExercises({
  name,
  options,
  selected,
  onChange,
  children,
}) {
  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <select name={name} id={name} value={selected._id} onChange={onChange}>
        {options.map((option) => (
          <option value={option._id} key={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
