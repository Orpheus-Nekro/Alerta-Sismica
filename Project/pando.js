const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const puerto = 3500;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Orpheus',
    password: 'Orpheus666demon',
    database: 'alertasismica'
});


conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.message);
        return;
    }
    console.log('¡Conexión a la base de datos exitosa!');
});

app.get('/', (req, res) => {
    res.send('Ruta de pando');
});

app.get('/pando', (req, res) => {
    let sql = "SELECT * FROM pando;";

    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err.message);
            res.status(500).json({ error: 'Error al obtener provincias de Pando', detalle: err.message });
        } else {
            res.json({ mensaje: 'Lista de provincias de Pando obtenida correctamente', result });
        }
    });
});

app.post('/pando', (req, res) => {
    let data = {
        idprovincia: req.body.idprovincia,
        nombreprovincia: req.body.nombreprovincia,
        idubicacion: req.body.idubicacion
    };

    let sql = 'INSERT INTO pando SET ?';

    conexion.query(sql, data, (err, resultado) => {
        if (err) {
            console.error('Error al insertar:', err.message);
            res.status(500).json({ mensaje: 'Error, no se pudo agregar la provincia de Pando', error: err.message });
        } else {
            res.json({ mensaje: 'Provincia de Pando agregada correctamente', resultado });
        }
    });
});

app.listen(puerto, function () {
    console.log('Servidor OK en puerto: ' + puerto);
});
