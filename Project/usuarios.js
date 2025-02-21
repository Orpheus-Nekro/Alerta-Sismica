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

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.message);
        return;
    }
    console.log('¡Conexión a la base de datos exitosa!');
});

app.get('/', (req, res) => {
    res.send('Usuarios Registrados');
});

app.get('/usuarios', (req, res) => {
    let sql = "SELECT * FROM usuarios;";

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err.message);
            res.status(500).json({ error: 'Error al obtener listado de Usuarios', detalle: err.message });
        } else {
            res.json({ mensaje: 'Lista de Usuarios obtenida correctamente', result });
        }
    });
});

app.post('/usuarios', (req, res) => {
    let data = {
        idusuario: req.body.idusuario,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        fcmtoken: req.body.fcmtoken,
        fecharegistro: req.body.fecharegistro
    };

    let sql = 'INSERT INTO usuarios SET ?';

    connection.query(sql, data, (err, resultado) => {
        if (err) {
            console.error('Error al insertar:', err.message);
            res.status(500).json({ mensaje: 'Error, no se pudo agregar el usuario', error: err.message });
        } else {
            res.json({ mensaje: 'Usuario agregado correctamente', resultado });
        }
    });
});

app.listen(puerto, function () {
    console.log('Servidor OK en puerto: ' + puerto);
});
