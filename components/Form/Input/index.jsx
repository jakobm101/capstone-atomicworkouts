export default function Form__Input({ name, children = "", type = "text", ...props }) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <input name={name} type={type} id={name} placeholder={name} {...props}/>
    </>
  );
}
