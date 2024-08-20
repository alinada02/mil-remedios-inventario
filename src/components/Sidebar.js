import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ loggedIn, handleLogout }) => (
  <div className="sidebar">
    <h2>Menú</h2>
    <nav>
      <ul>
        <li><Link to="/inventario" className="nav-link">Inventario</Link></li>
        <li><Link to="/reportes" className="nav-link">Reportes</Link></li>
        {loggedIn && <li><button className="button" onClick={handleLogout}>Cerrar Sesión</button></li>}
      </ul>
    </nav>
  </div>
);

export default Sidebar;
