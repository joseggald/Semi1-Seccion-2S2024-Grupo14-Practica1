import React from 'react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
  {message}
  <button className="ml-4 text-sm" onClick={onClose}>✖</button>
</div>
  );
};

export default SuccessMessage;
