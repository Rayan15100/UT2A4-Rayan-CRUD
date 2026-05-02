import React, { useState } from 'react';
import Menu from '../components/Menu';
import InformeColeccion from '../components/InformeColeccion';
import { Box, Button } from '@mui/material';

export default function Reports() {
  // Variable de control para renderizar el componente
  const [showReport, setShowReport] = useState(false);
  // Variable para almacenar los datos obtenidos de la consulta
  const [reportData, setReportData] = useState([]);

  // Función que maneja el evento al picar en el botón
  const handleReport = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();
      setReportData(data.data || data);
      setShowReport(true);
    } catch (error) {
      console.error("Error al cargar datos del informe", error);
    }
  };

  return (
    <>
      <Menu />
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant="contained" color="secondary" onClick={handleReport} sx={{ mb: 3 }}>
          INFORME COLECCION
        </Button>
        {/* Renderizamos pasando la prop data */}
        {showReport && <InformeColeccion data={reportData} />}
      </Box>
    </>
  );
}