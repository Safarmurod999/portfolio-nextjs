import { useState } from "react";

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
  name,
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
        name={name}
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
  name,
}: SelectProps) => {
  return (
    <div className={`form-control w-${width}`}>
      <label className="form-label">{label}</label>
      <select
        className="form-input"
        value={value}
        onChange={onChange}
        required={required}
        name={name}
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

const FormMultiSelect = ({
  label,
  placeholder = "Select options",
  options,
  value,
  onChange,
  width,
}: MultiSelectProps & { value: (string | number)[]; onChange: (val: (string | number)[]) => void }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string | number) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="form-multi">
      {label && <label className="form-label">{label}</label>}
      <div
        className="form-multi-control"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value.length > 0
          ? options
              .filter((opt) => value.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")
          : placeholder}
        <span>▼</span>
      </div>

      {open && (
        <div className="form-multi-options">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`form-multi-option ${
                value.includes(opt.value) ? "selected" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                readOnly
              />
              {opt.label}
            </div>
          ))}
        </div>
      )}
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

const FormImage = ({ label, onChange, width, name }) => {
  return (
    <div className={`form-control w-${width}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className="form-input"
        type="file"
        id={name}
        name={name}
        accept="image/png image/jpeg image/jpg"
        onChange={onChange}
      />
    </div>
  );
};
export {
  Form,
  FormControl,
  FormSelect,
  FormMultiSelect,
  FormBtn,
  FormSwitch,
  FormImage,
};
