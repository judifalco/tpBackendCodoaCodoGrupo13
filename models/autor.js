const mysql = require('mysql');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'CaC2024',
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
function actualizarAutor(id_autor, autorData, callback) {
    const { nombre, apellido, fecha_nacimiento } = autorData;
    const sql = 'UPDATE autores SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id_autor = ?';
    connection.query(sql, [nombre, apellido, fecha_nacimiento, id_autor], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un autor
function eliminarAutor(id_autor, callback) {
    const sql = 'DELETE FROM autores WHERE id_autor = ?';
    connection.query(sql, [id_autor], (err, result) => {
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
