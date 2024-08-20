import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import Inventario from './components/Inventario';
import Reportes from './components/Reportes';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [informes, setInformes] = useState([]); // Estado para guardar los informes de inventarios

const manejarFinalizarInventario = (items, fechaHora) => {
  setInformes([...informes, { fechaHora, items }]);
};
//  const manejarFinalizarInventario = (items) => {
  //  setInformes([...informes, { id: Date.now(), items }]);
 // };

  return (
    <Router>
      <Layout
        loggedIn={loggedIn}
        usuario={usuario}
        setLoggedIn={setLoggedIn}
        setUsuario={setUsuario}
        informes={informes}
        onFinalizarInventario={manejarFinalizarInventario}
      />
    </Router>
  );
};

const Layout = ({ loggedIn, usuario, setLoggedIn, setUsuario, informes, onFinalizarInventario }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  const handleLogout = () => {
    setLoggedIn(false);
    setUsuario('');
  };

  return (
    <div className="app-container">
      {showSidebar && (
        <div className="sidebar">
          <h2>Menú</h2>
          <nav>
            <ul>
              <li><Link to="/inventario" className="nav-link">Inventario</Link></li>
              <li><Link to="/reportes" className="nav-link">Reportes</Link></li>
              {loggedIn && <li><button className="button" onClick={handleLogout}>Cerrar Sesión</button></li>}
            </ul>
          </nav>
          {loggedIn && <p className="welcome-message">Bienvenido, {usuario}</p>}
        </div>
      )}
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            loggedIn ? <Navigate to="/inventario" replace /> : <Login onLogin={setLoggedIn} setUsuario={setUsuario} />
          } />
          <Route path="/inventario" element={
            loggedIn ? <Inventario onFinalizarInventario={onFinalizarInventario} /> : <Navigate to="/" replace />
          } />
          <Route path="/reportes" element={
            loggedIn ? <Reportes informes={informes} /> : <Navigate to="/" replace />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
