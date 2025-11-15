import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white p-6 text-center text-gray-600 shadow-inner dark:bg-gray-800 dark:text-gray-400">
      <p>&copy; {new Date().getFullYear()} Dimalsha Perera. All rights reserved.</p>
    </footer>
  );
};

export default Footer;