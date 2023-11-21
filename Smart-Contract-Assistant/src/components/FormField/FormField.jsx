import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

export const FormField = ({
  className,
  text = "contract Title",
  frameClassName,
  softwareEngineerClassName,
  value,
  onChange,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(''); // Clear the input
  };

  const handleChange = (newValue) => {
    setDisplayValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (error) {
      setIsFocused(false); // Reset focus state to allow error to show again
      setDisplayValue(''); // Optionally clear the display value
    }
  }, [error]);

  return (
    <div className={`form-field ${className}`}>
      <div className="contract-title">{text}</div>
      {className === "software-engineer-1" ? (
        <textarea
          onFocus={handleFocus}
          className={`software-engineer-1 ${error && !isFocused ? 'error' : ''}`}
          name="softwareengineer"
          placeholder="Words"
          value={error && !isFocused ? error : displayValue}
          style={error && !isFocused ? { color: 'red' } : {}}
          onChange={(e) => handleChange(e.target.value)}
        ></textarea>
      ) : (
        <input
          onFocus={handleFocus}
          type="text"
          className={`frame ${frameClassName} ${softwareEngineerClassName} ${error && !isFocused ? 'error' : ''}`}
          value={error && !isFocused ? error : displayValue}
          style={error && !isFocused ? { color: 'red' } : {}}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  );
};

FormField.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  frameClassName: PropTypes.string,
  softwareEngineerClassName: PropTypes.string,
  error: PropTypes.string,
};

export default FormField;
