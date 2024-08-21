import React, { useState, useEffect } from 'react';
import './Inventario.css';
import Quagga from 'quagga';

const Inventario = ({ onFinalizarInventario }) => {
  const [referencia, setReferencia] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [productos, setProductos] = useState([]);
  const [escaneoActivo, setEscaneoActivo] = useState(false);

  useEffect(() => {
    if (escaneoActivo) {
      iniciarEscaneo();
    } else {
      detenerEscaneo();
    }

    return () => detenerEscaneo();
  }, [escaneoActivo]);

  const iniciarEscaneo = () => {
    if (Quagga) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["code_128_reader"]
        }
      }, (err) => {
        if (err) {
          console.error("Error al inicializar Quagga:", err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected((data) => {
        setReferencia(data.codeResult.code);
        setEscaneoActivo(false); // Detener el escaneo después de leer un código
      });
    } else {
      console.error("Quagga no está definido.");
    }
  };

  const detenerEscaneo = () => {
    if (Quagga && Quagga.initialized) {
      Quagga.stop();
    } else {
      console.error("Quagga no está definido o no ha sido inicializado.");
    }
  };

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

      {/* Contenedor para el escáner */}
      {escaneoActivo && (
        <div id="scanner-container" className="scanner-container">
          {/* La cámara y el flujo de video se mostrarán aquí */}
        </div>
      )}

      <button className="button" onClick={() => setEscaneoActivo(!escaneoActivo)}>
        {escaneoActivo ? 'Detener Escaneo' : 'Iniciar Escaneo'}
      </button>
    </div>
  );
};

export default Inventario;
