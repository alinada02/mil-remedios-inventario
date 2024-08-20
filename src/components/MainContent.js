import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Inventario from './Inventario';
import Reportes from './Reportes';
import Login from './Login';

const MainContent = ({ loggedIn, onFinalizarInventario, informes, setLoggedIn, setUsuario }) => (
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
);

export default MainContent;

