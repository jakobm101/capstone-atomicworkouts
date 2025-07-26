export default function Form__Input({ name, children = "", type = "text" }) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <input type={type} id={name} placeholder={name} />
    </>
  );
}
