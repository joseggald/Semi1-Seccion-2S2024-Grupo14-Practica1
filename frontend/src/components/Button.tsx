import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-buttonBg hover:bg-buttonHoverBg text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-transform duration-300 ease-in-out transform hover:scale-105 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
