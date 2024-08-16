import React, { useState, useEffect } from 'react';
import Quagga from 'quagga'; // Importando quaggaJS

const Inventario = () => {
    const [items, setItems] = useState([]);
    const [codigoReferencia, setCodigoReferencia] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    // Función para agregar un artículo al inventario
    const agregarItem = () => {
        if (!nombre || !precio || !cantidad) {
            alert("Por favor, completa todos los campos obligatorios antes de agregar el artículo.");
            return;
        }

        const nuevoItem = {
            codigoReferencia,
            nombre,
            precio,
            cantidad
        };

        setItems([...items, nuevoItem]);
        setCodigoReferencia('');
        setNombre('');
        setPrecio('');
        setCantidad('');
    };

    // Función para finalizar el inventario y enviar los datos a la sección de reportes
    const finalizarInventario = () => {
        // Aquí podrías agregar lógica para enviar los datos al backend o guardarlos localmente
        alert("Inventario finalizado y enviado a reportes.");
        setItems([]); // Limpiar la lista de artículos después de finalizar el inventario
    };

    // Función para alternar el estado del escaneo
    const toggleScanner = () => {
        if (isScanning) {
            Quagga.stop(); // Detener el escaneo
            setIsScanning(false);
        } else {
            iniciarEscaneo();
            setIsScanning(true);
        }
    };

    // Función para iniciar el escaneo de códigos de barras
    const iniciarEscaneo = () => {
        Quagga.init({
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment" // Utilizar la cámara trasera
                }
            },
            decoder: {
                readers: ["code_128_reader"] // Seleccionando el formato de los códigos de barras
            }
        }, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Iniciado correctamente");
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            const code = data.codeResult.code;
            console.log(`Código detectado: ${code}`);

            // Aquí se podría realizar la búsqueda del artículo en la base de datos.
            setCodigoReferencia(code);

            // Detener el escaneo automáticamente después de detectar un código
            Quagga.stop();
            setIsScanning(false);
        });
    };

    return (
        <div>
            <h2>Inventario</h2>
            <button onClick={toggleScanner}>
                {isScanning ? 'Detener Escáner' : 'Iniciar Escáner'}
            </button>
            <div>
                <label>Código de Referencia:</label>
                <input
                    type="text"
                    value={codigoReferencia}
                    onChange={(e) => setCodigoReferencia(e.target.value)}
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="text"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="text"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                />
            </div>
            <button onClick={agregarItem}>Agregar Artículo</button>
            <button onClick={finalizarInventario}>Finalizar Inventario</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.codigoReferencia} - {item.nombre} - {item.precio} - {item.cantidad}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventario;
