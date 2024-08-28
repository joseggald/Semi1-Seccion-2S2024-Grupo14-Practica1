import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 flex items-center p-4 mb-4 w-full max-w-xs text-green-500 bg-[#22222b] rounded-lg shadow-lg backdrop-blur-md z-50 animate-slide-in">
      <div className="flex-shrink-0">
        <FaCheckCircle size={24} />
      </div>
      <div className="ml-3 text-sm font-semibold">
        {message}
      </div>
      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 bg-transparent rounded-lg p-1.5 hover:bg-gray-700 hover:text-white transition-colors duration-300"
      >
        <span className="sr-only">Close</span>
        ✖
      </button>
      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SuccessMessage;
