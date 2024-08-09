import React, { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Aquí iría la lógica de autenticación real
    // Por ahora, haremos una validación simple
    if (username === 'admin' && password === 'password') {
      setError('');
      onLogin(username);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Farmacia Mil Remedios</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;