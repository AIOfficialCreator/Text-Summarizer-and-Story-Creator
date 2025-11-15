
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full text-center">
        <div className="bg-red-900/50 text-red-300 border border-red-700 rounded-lg p-4">
            <p className="font-semibold">An Error Occurred</p>
            <p className="text-sm mt-1">{message}</p>
        </div>
    </div>
  );
};

export default ErrorMessage;
