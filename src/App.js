import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Inventario from './components/Inventario';
import Reportes from './components/Reportes';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsuario(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsuario('');
  };

  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>Farmacia Mil Remedios - Gestión de Inventarios</h1>
        </header>
        {loggedIn && (
          <nav className="nav">
            <ul>
              <li><Link to="/inventario">Inventario</Link></li>
              <li><Link to="/reportes">Reportes</Link></li>
              <li><button className="button" onClick={handleLogout}>Cerrar Sesión</button></li>
            </ul>
          </nav>
        )}
        {loggedIn && <p className="welcome-message">Bienvenido, {usuario}</p>}

        <Routes>
          <Route path="/" element={
            loggedIn ? <Navigate to="/inventario" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/inventario" element={
            loggedIn ? <Inventario /> : <Navigate to="/" replace />
          } />
          <Route path="/reportes" element={
            loggedIn ? <Reportes /> : <Navigate to="/" replace />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;