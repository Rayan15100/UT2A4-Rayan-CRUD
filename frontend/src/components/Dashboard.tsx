import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Alert, TableContainer, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

// Creamos el tipo itemtype. Este tipo será un objeto con un id opcional de tipo number, nombre, marca y tipo de tipo string y el precio de tipo number
interface itemtype {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

// Inicializo los valores del item. Aquí no pongo el id porque no lo necesito
const itemInitialState: itemtype = { nombre: '', marca: '', tipo: '', precio: 0 };

export default function Dashboard() {
  // Cuando declaremos el useState del item en nuestro código:
  const [item, setItem] = useState<itemtype>(itemInitialState);
  const [tableData, setTableData] = useState<itemtype[]>([]);
  const [mensaje, setMensaje] = useState('');
  
  // Pillamos los datos del usuario logueado desde el store de Redux
  const userData = useSelector((state: RootState) => state.authenticator);

  // Función para pedir los datos a la base de datos
  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();
      // Guardamos los datos recibidos en el estado para pintarlos en la tabla
      setTableData(data.data || data); 
    } catch (error) {
      console.error("Error al cargar la colección", error);
    }
  };

  // Se ejecuta al cargar el componente por primera vez
  useEffect(() => {
    fetchItems();
  }, []);

  // Función que lanza el fetch para insertar cuando le damos al botón
  const handleInsertar = async () => {
    try {
      const url = `http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`;
      await fetch(url);
      setMensaje('Datos guardados con éxito');
      setItem(itemInitialState); // Limpiar datos de los TextField
      fetchItems(); // Recargamos la tabla para que salga el nuevo dato al momento
      setTimeout(() => setMensaje(''), 3000); // Quitamos el aviso a los 3 segundos
    } catch (error) {
      console.error("Error al insertar", error);
    }
  };

  // Función para borrar haciendo un fetch pasándole el id
  const handleDeleteItem = async (row: itemtype) => {
    try {
      await fetch(`http://localhost:3030/deleteItem?id=${row.id}`);
      fetchItems(); // Recargamos la tabla para que desaparezca visualmente
    } catch (error) {
      console.error("Error al borrar", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Si hay mensaje de éxito, pintamos la alerta verde */}
      {mensaje && <Alert severity="success" sx={{ mb: 2 }}>{mensaje}</Alert>}
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} mb={2}>
          {/* Campos del formulario que actualizan el objeto item sobre la marcha */}
          <TextField label="Nombre *" value={item.nombre} onChange={(e) => setItem({ ...item, nombre: e.target.value })} fullWidth />
          <TextField label="Marca *" value={item.marca} onChange={(e) => setItem({ ...item, marca: e.target.value })} fullWidth />
          <TextField label="Tipo *" value={item.tipo} onChange={(e) => setItem({ ...item, tipo: e.target.value })} fullWidth />
          <TextField label="Precio *" type="number" value={item.precio || ''} onChange={(e) => setItem({ ...item, precio: Number(e.target.value) })} fullWidth />
        </Box>
        <Box display="flex" justifyContent="center">
          <Tooltip title="Guardar producto en la base de datos" placement="top" arrow>
            <Button variant="contained" onClick={handleInsertar} sx={{ bgcolor: '#1d3557' }}>
              + INSERTAR DATOS
            </Button>
          </Tooltip>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        {/* Etiqueta obligatoria para temas de accesibilidad */}
        <Table aria-label='Nombre Tabla para accesibilidad'>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}></TableCell>
              <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white' }}>Marca</TableCell>
              <TableCell sx={{ color: 'white' }}>Tipo</TableCell>
              <TableCell sx={{ color: 'white' }}>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Hacemos un map para recorrer el array y pintar todas las filas dinámicamente */}
            {tableData.map((row: itemtype) => (
              <TableRow key={row.id}>
                <TableCell>
                  {/* Renderizado condicional: el usuario con rol user no va a poder eliminar registros */}
                  {userData.userRol === 'admin' && (
                    <Tooltip title="Borrar este registro para siempre" placement="right" arrow>
                      <Button onClick={() => handleDeleteItem(row)} color="error">
                        <DeleteForeverIcon />
                      </Button>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}