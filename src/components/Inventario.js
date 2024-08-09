import React, { useState } from 'react';

const Inventario = () => {
  const [items, setItems] = useState([]);
  const [nuevoItem, setNuevoItem] = useState({ nombre: '', cantidad: '', precio: '' });

  const agregarItem = (e) => {
    e.preventDefault();
    setItems([...items, { ...nuevoItem, id: Date.now() }]);
    setNuevoItem({ nombre: '', cantidad: '', precio: '' });
  };

  const eliminarItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Inventario</h2>
      <form onSubmit={agregarItem}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoItem.nombre}
          onChange={(e) => setNuevoItem({ ...nuevoItem, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevoItem.cantidad}
          onChange={(e) => setNuevoItem({ ...nuevoItem, cantidad: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoItem.precio}
          onChange={(e) => setNuevoItem({ ...nuevoItem, precio: e.target.value })}
        />
        <button type="submit">Agregar Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.nombre} - Cantidad: {item.cantidad} - Precio: ${item.precio}
            <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventario;