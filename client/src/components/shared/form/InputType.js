import React from "react";

const InputType = ({ labelText, labelFor, inputType, value, onChange, name, autoComplete }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={labelFor} className="form-label">
          {labelText}
        </label>
        <input id={labelFor} type={inputType} className="form-control" name={name} value={value} onChange={onChange} autoComplete={autoComplete || name} />
      </div>
    </>
  );
};

export default InputType;
