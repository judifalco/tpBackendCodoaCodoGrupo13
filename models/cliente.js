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

// Funciones CRUD para clientes

// Obtener todos los clientes
function obtenerClientes(callback) {
    const sql = 'SELECT * FROM clientes';
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// Crear un nuevo cliente
function crearCliente(clienteData, callback) {
    const { nombre, apellido, email } = clienteData;
    const sql = 'INSERT INTO clientes (nombre, apellido, email) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, apellido, email], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Actualizar un cliente existente
function actualizarCliente(id_cliente, clienteData, callback) {
    const { nombre, apellido, email } = clienteData;
    const sql = 'UPDATE clientes SET nombre = ?, apellido = ?, email = ? WHERE id_cliente = ?';
    connection.query(sql, [nombre, apellido, email, id_cliente], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un cliente
function eliminarCliente(id_cliente, callback) {
    const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
    connection.query(sql, [id_cliente], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};
