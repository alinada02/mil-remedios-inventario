import React, { useState } from 'react';
import Login from './components/Login';
import Inventario from './components/Inventario';
import Reportes from './components/Reportes';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [currentPage, setCurrentPage] = useState('inventario');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsuario(username);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentPage('inventario')}>Inventario</button>
        <button onClick={() => setCurrentPage('reportes')}>Reportes</button>
      </nav>
      <h1>Farmacia Mil Remedios - Gestión de Inventarios</h1>
      <p>Bienvenido, {usuario}</p>
      {currentPage === 'inventario' ? <Inventario /> : <Reportes />}
    </div>
  );
};

export default App;