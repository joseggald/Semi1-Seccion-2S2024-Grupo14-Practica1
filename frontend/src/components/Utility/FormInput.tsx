import React, { useState, useEffect, useRef } from 'react';

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, id, value, onChange }) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [inputType, setInputType] = useState(type); // Estado para manejar el tipo de input
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value) {
      setHasFocus(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="relative mb-6">
      <input
        ref={inputRef}
        type={inputType}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setHasFocus(true)}
        onBlur={() => !value && setHasFocus(false)}
        className="block w-full px-4 py-4 bg-inputBg border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 ease-in-out"
        placeholder={label}
        style={{ backgroundColor: 'rgba(34, 40, 49, 1)' }}
      />
      <label
        htmlFor={id}
        className={`absolute left-2 transition-all duration-300 ease-in-out transform ${
          hasFocus || value
            ? '-translate-y-6 scale-75 text-white mt-1 bg-inputBg m-2 p-1 rounded-lg border border-gray-600 px-3'
            : `translate-y-0 scale-100 text-gray-400 rounded-lg px-2 ${label === 'Date of Birth' ? 'opacity-0' : ''}`
        }`}
        style={{
          top: hasFocus || value ? '0.10rem' : '1rem',
          pointerEvents: 'none',
          transformOrigin: 'left center',
        }}
      >
        {label}
      </label>
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-4 text-gray-400 focus:outline-none"
        >
          {inputType === 'password' ? 'Show' : 'Hide'}
        </button>
      )}

      <style jsx>{`
        input:-webkit-autofill {
          background-color: rgba(34, 40, 49, 1) !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

export default FormInput;
