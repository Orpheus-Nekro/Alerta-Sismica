const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const puerto = 3500;

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'AlertaSismica'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.message);
        return;
    }
    console.log('¡Conexión a la base de datos exitosa!');
});

app.get('/', (req, res) => {
    res.send('Ruta de potosi');
});

app.get('/potosi', (req, res) => {
    let sql = "SELECT * FROM potosi;";

    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err.message);
            res.status(500).json({ error: 'Error al obtener provincias de Potosí', detalle: err.message });
        } else {
            res.json({ mensaje: 'Lista de provincias de Potosí obtenida correctamente', result });
        }
    });
});

app.post('/potosi', (req, res) => {
    let data = {
        idprovincia: req.body.idprovincia,
        nombreprovincia: req.body.nombreprovincia,
        idubicacion: req.body.idubicacion
    };

    let sql = 'INSERT INTO potosi SET ?';

    conexion.query(sql, data, (err, resultado) => {
        if (err) {
            console.error('Error al insertar:', err.message);
            res.status(500).json({ mensaje: 'Error, no se pudo agregar la provincia de Potosí', error: err.message });
        } else {
            res.json({ mensaje: 'Provincia de Potosí agregada correctamente', resultado });
        }
    });
});

app.listen(puerto, function () {
    console.log('Servidor OK en puerto: ' + puerto);
});
