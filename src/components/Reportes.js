import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Reportes = ({ inventario }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(inventario);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'inventario.xlsx');
  };

  return (
    <div>
      <h2>Historial de Inventarios</h2>
      <button onClick={exportToExcel}>Descargar Inventario en Excel</button>
      {/* Aquí puedes agregar el código existente para mostrar el historial de inventarios */}
    </div>
  );
};

export default Reportes;
