const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const puerto = 3500;

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Orpheus',
    password: 'Orpheus666demon',
    database: 'alertasismica'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.message);
        return;
    }
    console.log('¡Conexión a la base de datos exitosa!');
});

// Obtener todas las ubicaciones
// app.get('/ubicacion', (req, res) => {
//     let sql = "SELECT * FROM ubicacion;";

//     connection.query(sql, (err, result) => {
//         if (err) {
//             console.error('Error en la consulta:', err.message);
//             return res.status(500).json({ error: 'Error al obtener ubicaciones', detalle: err.message });
//         }
//         res.json({ mensaje: 'Lista de ubicaciones obtenida correctamente', result });
//     });
// });

// Agregar una nueva ubicación
app.post('/ubicacion', (req, res) => {
    const { idubicacion, nombredepartamento } = req.body;

    if (!idubicacion || !nombredepartamento) {
        return res.status(400).json({ mensaje: 'Error: Debes proporcionar idubicacion y nombredepartamento' });
    }

    let data = { idubicacion, nombredepartamento };
    let sql = 'INSERT INTO ubicacion SET ?';

    connection.query(sql, data, (err, resultado) => {
        if (err) {
            console.error('Error al insertar:', err.message);
            return res.status(500).json({ mensaje: 'Error, no se pudo agregar la ubicación', error: err.message });
        }
        res.json({ mensaje: 'Ubicación agregada correctamente', resultado });
    });
});

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor OK en puerto: ${puerto}`);
});
