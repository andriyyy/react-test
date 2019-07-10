import React from 'react';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const renderUploadField = ({ 
  classes,
  meta,
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  ...props 
}) => {
  return (
  <div>
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
      {meta.touched && meta.invalid && meta.error && (
           <p className = "error">{meta.error}</p>
                   )}
  </div>

  );
};

export default renderUploadField;
