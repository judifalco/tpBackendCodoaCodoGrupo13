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
    const { titulo, genero, id_autor, precio } = libroData;
    const sql = 'INSERT INTO libros (titulo, genero, id_autor, precio) VALUES (?, ?, ?, ?)';
    connection.query(sql, [titulo, genero, id_autor, precio], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Actualizar un libro existente
function actualizarLibro(id_libro, libroData, callback) {
    const { titulo, genero, id_autor, precio } = libroData;
    const sql = 'UPDATE libros SET titulo = ?, genero = ?, precio = ?, id_autor = ? WHERE id_libro = ?';
    connection.query(sql, [titulo, genero, id_autor, id_libro, precio], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un libro
function eliminarLibro(id_libro, callback) {
    const sql = 'DELETE FROM libros WHERE id_libro = ?';
    connection.query(sql, [id_libro], (err, result) => {
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
