// src/components/ui/card.js
import React from 'react';
import './card.css'; // Asegúrate de crear el archivo card.css si lo necesitas

const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
