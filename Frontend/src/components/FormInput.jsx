const FormInput = ({ type, name, value, onChange, placeholder, className = "", ...props }) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded-md ${className}`}
      required
      {...props}
    />
  );
};

export default FormInput;

  