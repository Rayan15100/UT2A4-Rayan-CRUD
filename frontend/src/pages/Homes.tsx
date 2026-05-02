import React from 'react';
import Menu from '../components/Menu';
import Dashboard from '../components/Dashboard';

// Esta es la página principal que junta el menú lateral y la tabla con el CRUD
export default function Homes() {
  return (
    <>
      <Menu />
      <Dashboard />
    </>
  );
}