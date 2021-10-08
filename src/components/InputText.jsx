import React from 'react';

function InputText({
  type,
  readOnly,
  required,
  value,
  onChange,
  placeholder,
  styleClass,
}) {
  return (
    <input
      type={type}
      className={`form-control ${styleClass}`}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={() => onChange && onChange}
      value={value}
    />
  );
}

export default InputText;
