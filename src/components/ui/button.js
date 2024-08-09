// src/components/ui/button.js
import React from 'react';
import './button.css'; // Asegúrate de crear el archivo button.css si lo necesitas

const Button = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
