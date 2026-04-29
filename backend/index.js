// importo el express y el cors
const express = require('express')
const cors = require('cors')

// importo los ficheros de servicios
const login = require('./services/login')
const items = require('./services/items') // Importación del nuevo servicio

// Definimos el puerto por el que va a escuchar nuestra API
const port = 3030
const app = express()

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())

// Endpoint raíz
app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

// Endpoint para el login existente
app.get('/login', async function(req, res, next) {
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

// ENDPOINTS UT2A4

// Endpoint para obtener los registros de la colección 
app.get('/getItems', async function(req, res, next) {
    try {
        res.json(await items.getData()) // Llamada a la función del servicio
    } catch (err) {
        console.error('Error while getting items', err.message);
        next(err);
    }
})

// Endpoint para añadir un registro a la colección
app.get('/addItem', async function(req, res, next) {
    try {
        // Pasamos req para que la función pueda leer los datos de la query
        res.json(await items.insertData(req))
    } catch (err) {
        console.error('Error while inserting items', err.message);
        next(err);
    }
})

// Endpoint para borrar un registro por ID 
app.get('/deleteItem', async function(req, res, next) {
    try {
        // Pasamos req para leer el ID que queremos borrar
        res.json(await items.deleteData(req))
    } catch (err) {
        console.error('Error while deleting items', err.message);
        next(err);
    }
})

// Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)