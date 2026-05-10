import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

export default function Login() {
  // Estados para guardar lo que escribe el usuario en los inputs
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos que la página recargue de golpe
    try {
      // Hacemos la petición al backend pasándole el user y pass por la URL
      const response = await fetch(`http://localhost:3030/login?user=${user}&password=${password}`);
      const data = await response.json();
      
      // Si nos devuelve datos, es que el login es correcto
      if (data.data.length !== 0) {
        // Guardamos el usuario en Redux y lo mandamos a home
        dispatch(authActions.login({ name: data.data[0].nombre, rol: data.data[0].rol }));
        navigate('/home');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    // Centramos el cajón del login en el medio de la pantalla
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
        <Typography variant="h5" textAlign="center">Iniciar Sesión</Typography>
        <TextField label="Usuario" variant="outlined" value={user} onChange={(e) => setUser(e.target.value)} />
        <TextField label="Contraseña" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {/* Tooltip en forma de flecha indicando posición */}
        <Tooltip title="Haz clic para iniciar sesión" placement="bottom" arrow>
          <Button variant="contained" color="primary" onClick={handleLogin}>Acceder</Button>
        </Tooltip>
      </Paper>
    </Box>
  );
}