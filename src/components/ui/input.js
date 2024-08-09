// src/components/ui/input.js
import React from 'react';
import './input.css'; // Asegúrate de crear el archivo input.css si lo necesitas

const Input = ({ type = 'text', value, onChange, placeholder }) => {
  return (
    <input
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
