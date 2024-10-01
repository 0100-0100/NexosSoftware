import React from 'react';

interface InputCardProps {
  title: string
  submitButtonText: string
  submitHandler: any
  fields: any
  error: any
  isLoading?: boolean
}

const InputCard: React.FC<InputCardProps> = ({ title, submitButtonText, submitHandler, fields, error, isLoading }) => {
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={submitHandler} >
        <p className='pr-3 text-red-500'>{error ? error : ""} </p>
        {fields}
        <input className="Button" value={isLoading ? "Loading..." : submitButtonText} type="submit" disabled={isLoading} />
      </form>
    </div>
  );
};

export default InputCard;
