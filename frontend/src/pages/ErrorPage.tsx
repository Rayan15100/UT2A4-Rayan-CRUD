import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function ErrorPage() {
  // Hook que lee el error lanzado por el router
  const error = useRouteError(); 

  let titulo = 'Ruta no encontrada';
  let detalle = 'Comprueba la URL o vuelve al acceso.';

  // Comprobamos si es un error de respuesta de ruta 
  if (isRouteErrorResponse(error)) { 
    titulo = `${error.status} ${error.statusText}`; 
    detalle = error.data || 'Ha ocurrido un error al cargar esta vista.'; 
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'grid', 
        placeItems: 'center', 
        textAlign: 'center', 
        p: 3 
      }}
    >
      <div>
        <Typography variant="h3" gutterBottom>{titulo}</Typography>
        <Typography sx={{ mb: 3 }}>{String(detalle)}</Typography>
        
        {/* Usamos Link de react-router-dom para la navegación */}
        <Button 
          component={Link} 
          to="/" 
          variant="contained"
        >
          Volver al acceso
        </Button>
      </div>
    </Box>
  );
}