import React, { useState } from 'react';


interface InputFieldProps {
  inputType: string
  description: string
  name: string
  value: any
  onChangeHandler: any
  autocomplete?: any
}

const InputField: React.FC<InputFieldProps> = ({ inputType, description, name, value, autocomplete }) => {
  const [setValue] = useState<any>()

  const onChangeHandler = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <p>{description}</p>
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChangeHandler}
        autoComplete={autocomplete}
      />
    </div>
  );
};

export default InputField;
