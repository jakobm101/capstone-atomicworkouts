export default function Dropdown({ options, name, children, selected }) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <select name={name} id={name} value={selected}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
