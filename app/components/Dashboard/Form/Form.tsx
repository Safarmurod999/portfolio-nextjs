const Form = ({ children, onSubmit, direction = "x", width }: FormProps) => {
  return (
    <form
      className={`flex gap-[10px] mb-[20px] ${
        direction == "y" ? "flex-col" : "flex-row"
      } w-${width}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

const FormControl = ({
  type,
  placeholder,
  label = null,
  required,
  onChange,
  value,
  width,
}: InputProps) => {
  return (
    <div className={`form-control w-${width}`}>
      {label && <label className="form-label">{label}</label>}
      <input
        className="form-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

const FormSelect = ({
  placeholder,
  label,
  required,
  onChange,
  value,
  options,
  width,
}: SelectProps) => {
  return (
    <div className={`form-control w-${width}`}>
      <label className="form-label">{label}</label>
      <select
        className="form-input"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FormBtn = ({ text, icon }: BtnProps) => {
  return (
    <button className="form-button" type="submit">
      <span>{text}</span>
      {icon && icon}
    </button>
  );
};
export { Form, FormControl, FormSelect, FormBtn };
