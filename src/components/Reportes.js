
// Reportes.js
import React from 'react';

const Reportes = ({ informes }) => {
  const descargarReporte = (informe) => {
    const contenido = informe.items.map(item => 
      `${item.referencia},${item.nombre},${item.precio},${item.cantidad}\n`
    ).join('');

    const blob = new Blob([contenido], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `informe-${informe.fechaHora.replace(/[/\s:]/g, '-')}.csv`; // Nombre basado en la fecha y hora
    a.click();
  };

  return (
    <div>
      <h2>Informes</h2>
      <ul>
        {informes.map((informe, index) => (
          <li key={index}>
            <p>Informe realizado el: {informe.fechaHora}</p>
            <button onClick={() => descargarReporte(informe)}>Descargar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reportes;
