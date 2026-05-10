import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HelpIcon from '@mui/icons-material/Help';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';
import type { RootState } from '../store';

export default function Menu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Pillamos los datos del usuario logueado desde el store de Redux
  const userData = useSelector((state: RootState) => state.authenticator);

  // Si no está autenticado, lo echamos fuera al login directamente
  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate('/');
    }
  }, [userData.isAutenticated, navigate]);

  // Función sencillita para abrir y cerrar el menú lateral
  const toggleDrawer = (newOpen: boolean) => () => { setOpen(newOpen); };
  
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <>
      {/* Barra superior de la aplicación */}
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <Tooltip title="Abrir menú lateral" placement="bottom-end" arrow>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          
          {/* Mostramos el nombre del usuario que sacamos de Redux */}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Bienvenido, <b>{userData.userName}</b>
          </Typography>
          
          {/* Renderizado condicional: iconos diferentes según el rol */}
          {userData.userRol === 'admin' ? <AdminPanelSettingsIcon /> : <AccountCircleIcon />}
        </Toolbar>
      </AppBar>

      {/* Menú lateral (Drawer) que sale al pulsar el botón hamburguesa */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List>
            {/* Usamos Link de react-router-dom para navegar sin recargar */}
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* Renderizado condicional: sólo el admin ve el menú de Informes */}
            {userData.userRol === 'admin' && (
              <Link to="/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon><AssessmentIcon /></ListItemIcon>
                    <ListItemText primary="Informes" />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}

            {/* Link de Ayuda que abre el PDF en una pestaña nueva */}
            <Link to="/manual.pdf" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Tooltip title="Ver el manual de usuario" placement="right" arrow>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon><HelpIcon /></ListItemIcon>
                    <ListItemText primary="Ayuda" />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Link>

            <Tooltip title="Cerrar la sesión actual" placement="right" arrow>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="Salir" />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
        </Box>
      </Drawer>
    </>
  );
}