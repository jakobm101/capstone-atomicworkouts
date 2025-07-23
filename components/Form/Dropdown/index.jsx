export default function Dropdown({ options, name, children }) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <select name={name} id={name}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
