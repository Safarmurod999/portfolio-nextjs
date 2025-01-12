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
        {options.map((option: OptionProps) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FormSwitch = ({ value, onChange }: SwitchProps) => {
  return (
    <label className="form-switch">
      <input type="checkbox" checked={value} onChange={onChange} />
      <div className={`toggle ${value ? "checked" : ""}`}></div>
    </label>
  );
};

const FormBtn = ({ text, icon }: BtnProps) => {
  return (
    <button className="form-button" type="submit">
      {icon && icon}
      <span>{text}</span>
    </button>
  );
};
export { Form, FormControl, FormSelect, FormBtn, FormSwitch };
