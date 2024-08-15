import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'hola.123') {
      onLogin(username);
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <div className="form-group">
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="button" type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;