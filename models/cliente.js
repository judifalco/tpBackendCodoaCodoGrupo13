const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'mysql-cac2024grupo13.alwaysdata.net',
    user: '368113',
    password: 'CaC2024',
    database: 'cac2024grupo13_tiendalibros'
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
function actualizarCliente(clienteId, clienteData, callback) {
    const { nombre, apellido, email } = clienteData;
    const sql = 'UPDATE clientes SET nombre = ?, apellido = ?, email = ? WHERE id = ?';
    connection.query(sql, [nombre, apellido, email, clienteId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un cliente
function eliminarCliente(clienteId, callback) {
    const sql = 'DELETE FROM clientes WHERE id = ?';
    connection.query(sql, [clienteId], (err, result) => {
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
