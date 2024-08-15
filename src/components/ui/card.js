// src/components/ui/card.js
import React from 'react';
import './card.css'; // Importa los estilos para la tarjeta

// Componente de tarjeta
const Card = ({ children, className, ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
);

// Encabezado de la tarjeta
const CardHeader = ({ children, className, ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

// Título de la tarjeta
const CardTitle = ({ children, className, ...props }) => (
  <div className={`card-title ${className}`} {...props}>
    {children}
  </div>
);

// Contenido de la tarjeta
const CardContent = ({ children, className, ...props }) => (
  <div className={`card-content ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent };
