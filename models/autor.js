const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // tu usuario de MySQL
    password: 'grupo13node', // tu contraseña de MySQL
    database: 'tienda_libros'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Funciones CRUD para autores

// Obtener todos los autores
function obtenerAutores(callback) {
    const sql = 'SELECT * FROM autores';
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// Crear un nuevo autor
function crearAutor(autorData, callback) {
    const { nombre, apellido, fecha_nacimiento } = autorData;
    const sql = 'INSERT INTO autores (nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, apellido, fecha_nacimiento], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Actualizar un autor existente
function actualizarAutor(autorId, autorData, callback) {
    const { nombre, apellido, fecha_nacimiento } = autorData;
    const sql = 'UPDATE autores SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id = ?';
    connection.query(sql, [nombre, apellido, fecha_nacimiento, autorId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un autor
function eliminarAutor(autorId, callback) {
    const sql = 'DELETE FROM autores WHERE id = ?';
    connection.query(sql, [autorId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = {
    obtenerAutores,
    crearAutor,
    actualizarAutor,
    eliminarAutor
};
