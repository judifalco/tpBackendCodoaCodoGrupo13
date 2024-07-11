const mysql = require('mysql');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
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

// Funciones CRUD para libros

// Obtener todos los libros
function obtenerLibros(callback) {
    const sql = 'SELECT * FROM libros';
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// Crear un nuevo libro
function crearLibro(libroData, callback) {
    const { titulo, genero, precio, autor_id } = libroData;
    const sql = 'INSERT INTO libros (titulo, genero, precio, autor_id) VALUES (?, ?, ?, ?)';
    connection.query(sql, [titulo, genero, precio, autor_id], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Actualizar un libro existente
function actualizarLibro(libroId, libroData, callback) {
    const { titulo, genero, precio, autor_id } = libroData;
    const sql = 'UPDATE libros SET titulo = ?, genero = ?, precio = ?, autor_id = ? WHERE id = ?';
    connection.query(sql, [titulo, genero, precio, autor_id, libroId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un libro
function eliminarLibro(libroId, callback) {
    const sql = 'DELETE FROM libros WHERE id = ?';
    connection.query(sql, [libroId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = {
    obtenerLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};
