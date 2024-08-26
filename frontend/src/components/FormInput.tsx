import React, { useState } from 'react';
import '../styles/formInput.css';

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, id, value, onChange }) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div className="relative mb-6">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        className={`block w-full mt-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${hasFocus || value ? 'pt-6' : ''}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2 transition-all duration-300 ease-in-out transform ${hasFocus || value ? '-translate-y-5 text-sm text-blue-500' : 'text-gray-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
