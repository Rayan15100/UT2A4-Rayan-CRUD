const db = require('./db');
const helper = require('../helper');

// Función para obtener todos los datos de la tabla coleccion (SELECT)
async function getData() {
    // Realizamos la consulta a la base de datos 
    const rows = await db.query('SELECT * FROM coleccion');
    // Usamos el helper para asegurar que devuelva un array (vacío si no hay datos) 
    const data = helper.emptyOrRows(rows);
    return { data }; // Devolvemos el objeto con los datos
}

// Función para insertar un nuevo registro (INSERT)
async function insertData(req) {
    // Los datos vienen en la query de la petición 
    const data = req.query;
    const sql = 'INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)';
    
    // Ejecutamos la consulta pasando los parámetros 
    const result = await db.query(sql, [data.nombre, data.marca, data.tipo, data.precio]);
    
    // Devolvemos el número de filas afectadas para confirmar la inserción 
    return result.affectedRows;
}

// Función para borrar un registro por su ID (DELETE)
async function deleteData(req) {
    // Capturamos el ID del elemento a borrar 
    const id = req.query.id;
    const sql = 'DELETE FROM coleccion WHERE id = ?';
    
    // Ejecutamos la consulta [cite: 220]
    const result = await db.query(sql, [id]);
    
    // Devolvemos el número de filas borradas 
    return result.affectedRows;
}

// Exportamos las funciones para usarlas en index.js
module.exports = {
    getData,
    insertData,
    deleteData
};