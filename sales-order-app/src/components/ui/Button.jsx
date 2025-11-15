import React from 'react';

const Button = ({ children, type = 'button', onClick, variant = 'primary', className = '' }) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;