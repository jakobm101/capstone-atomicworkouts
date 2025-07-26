export default function Dropdown({
  isExercises,
  options,
  name,
  children,
  selected,
  onChange,
}) {
  console.log("dropdwon selected", selected); 

  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <select name={name} id={name} value={isExercises ? selected._id : selected} onChange={onChange}>
        {options.map((option) => (
          <option
            value={isExercises ? option._id : option}
            key={isExercises ? option.name : option}
          >
            {isExercises ? option.name : option}
          </option>
        ))}
      </select>
    </div>
  );
}
