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
    res.send('Ruta de beni');
});

app.get('/beni', (req, res) => {
    let sql = "SELECT * FROM beni;";

    conexion.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err.message);
            res.status(500).json({ error: 'Error al obtener provincias de Beni', detalle: err.message });
        } else {
            res.json({ mensaje: 'Lista de provincias de Beni obtenida correctamente', result });
        }
    });
});

app.post('/beni', (req, res) => {
    let data = {
        idprovincia: req.body.idprovincia,
        nombreprovincia: req.body.nombreprovincia,
        idubicacion: req.body.idubicacion
    };

    let sql = 'INSERT INTO beni SET ?';

    conexion.query(sql, data, (err, resultado) => {
        if (err) {
            console.error('Error al insertar:', err.message);
            res.status(500).json({ mensaje: 'Error, no se pudo agregar la provincia de Beni', error: err.message });
        } else {
            res.json({ mensaje: 'Provincia de Beni agregada correctamente', resultado });
        }
    });
});

app.listen(puerto, function () {
    console.log('Servidor OK en puerto: ' + puerto);
});
