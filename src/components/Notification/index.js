
import React from 'react';

const Notification = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
      </div>
    </div>
  );
};

export default Notification;
