import { useState } from "react";

export default function Dropdown({
  isExercises,
  options,
  name,
  children,
  selected: selectedDefault,
}) {
  // dropdowns are weird
  // so this extra code is needed
  // for using default selection
  const [selected, setSelected] = useState(selectedDefault);
  const handleChange = (event) => setSelected(event.target.value);

  return (
    <>
      <label htmlFor={name}>{children}</label>
      <select name={name} id={name} value={selected} onChange={handleChange}>
        {options.map((option) => (
          <option
            value={isExercises ? option._id : option}
            key={isExercises ? option.name : option}
          >
            {isExercises ? option.name : option}
          </option>
        ))}
      </select>
    </>
  );
}
