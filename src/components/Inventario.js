import React, { useState } from 'react';

const Inventario = () => {
  const [items, setItems] = useState([]);
  const [nuevoItem, setNuevoItem] = useState({ nombre: '', cantidad: '', precio: '' });
  const [error, setError] = useState('');

  const agregarItem = (e) => {
    e.preventDefault();

    // Validaciones
    if (nuevoItem.nombre.trim() === '') {
      setError('Debe ingresar el nombre del artículo.');
      return;
    }

    if (nuevoItem.cantidad === '' || nuevoItem.cantidad <= 0) {
      setError('Debe ingresar una cantidad mayor que cero.');
      return;
    }

    if (nuevoItem.precio === '') {
      setError('Debe ingresar el precio del artículo.');
      return;
    }

    if (nuevoItem.precio < 0) {
      setError('El precio debe ser un valor positivo.');
      return;
    }

    // Agregar el nuevo item si todas las validaciones pasan
    setItems([...items, { ...nuevoItem, id: Date.now() }]);
    setNuevoItem({ nombre: '', cantidad: '', precio: '' });
    setError(''); // Limpiar errores
  };

  const eliminarItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Inventario</h2>
      {error && <p className="error-message">{error}</p>}
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
          onChange={(e) => setNuevoItem({ ...nuevoItem, cantidad: parseInt(e.target.value, 10) })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoItem.precio}
          onChange={(e) => setNuevoItem({ ...nuevoItem, precio: parseFloat(e.target.value) })}
        />
        <button type="submit">Agregar Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.nombre} - Cantidad: {item.cantidad} - Precio: ${item.precio.toFixed(2)}
            <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventario;
