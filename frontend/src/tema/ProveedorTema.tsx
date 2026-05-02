import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 

// Define tu tema personalizado
const temaApp = createTheme({ 
  palette: {
    primary: { main: '#264653' }, // Color principal
    secondary: { main: '#e76f51' }, // Color secundario 
    background: { default: '#f7f7f7' } // Color de fondo 
  },
  typography: { 
    fontFamily: 'Inter, system-ui, Arial' // Tipografía 
  }
});

// Componente proveedor que aplica el tema y resetea CSS
export function ProveedorTema({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={temaApp}>
      <CssBaseline /> {/* Normaliza los estilos base */}
      {children}
    </ThemeProvider>
  );
}