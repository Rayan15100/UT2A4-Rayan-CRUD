import React from 'react';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';

export default function InformeColeccion({ data }: { data: any[] }) {
  // Definición de las columnas de la tabla
  const columnas = [
    { title: 'Nombre', field: 'nombre', filtering: false },
    { title: 'Marca', field: 'marca', filtering: true },
    { title: 'Tipo', field: 'tipo', filtering: true },
    { title: 'Precio', field: 'precio', type: 'numeric' as const, filtering: false }
  ];

  // Realizar la suma de los precios de nuestra colección
  const totalPrecio = data.reduce((sum, item) => sum + Number(item.precio), 0);

  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      <h3 style={{ textAlign: 'center', color: '#1976d2' }}>Total de la colección: {totalPrecio}€</h3>
      <MaterialTable
        title="Informe de Colección"
        columns={columnas}
        data={data}
        options={{
          columnsButton: true, // Permitir elegir qué columnas mostrar
          filtering: true, // Habilitar el filtrado general
          exportMenu: [{
            label: 'Exportar a CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Informe_Coleccion')
          }, {
            label: 'Exportar a PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Informe_Coleccion')
          }],
          headerStyle: { backgroundColor: '#1976d2', color: '#FFF' }, // Colores de la paleta
          draggable: true // Poder mover las columnas
        }}
      />
    </div>
  );
}