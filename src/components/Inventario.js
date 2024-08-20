// Inventario.js
import React, { useState } from 'react';
import './Inventario.css';

const Inventario = ({ onFinalizarInventario }) => {
  const [referencia, setReferencia] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [productos, setProductos] = useState([]);

  const agregarProducto = () => {
    if (nombre && precio && cantidad) {
      const nuevoProducto = { referencia, nombre, precio, cantidad };
      setProductos([...productos, nuevoProducto]);
      setReferencia('');
      setNombre('');
      setPrecio('');
      setCantidad('');
    }
  };

  const obtenerFechaHoraActual = () => {
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString();
    const horaFormateada = fecha.toLocaleTimeString();
    return `${fechaFormateada} ${horaFormateada}`;
  };

  const finalizarInventario = () => {
    const fechaHora = obtenerFechaHoraActual();
    onFinalizarInventario(productos, fechaHora);
    setProductos([]);
  };

  return (
    <div className="inventario-container">
      <h2>Nuevo Inventario</h2>
      <div className="inventario-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Referencia del artículo"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre del artículo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio del artículo"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <button className="button" onClick={agregarProducto}>Agregar Producto</button>
        </div>
      </div>

      <div className="productos-list">
        <ul>
          {productos.map((producto, index) => (
            <li key={index}>
              {producto.referencia} - {producto.nombre} - ${producto.precio} - Cantidad: {producto.cantidad}
            </li>
          ))}
        </ul>
      </div>

      <button className="button" onClick={finalizarInventario}>Finalizar Inventario</button>
    </div>
  );
};

export default Inventario;

