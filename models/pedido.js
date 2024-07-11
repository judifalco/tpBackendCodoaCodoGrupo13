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

// Funciones CRUD para pedidos

// Obtener todos los pedidos
function obtenerPedidos(callback) {
    const sql = 'SELECT * FROM pedidos';
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// Crear un nuevo pedido
function crearPedido(pedidoData, callback) {
    const { id_cliente, id_libro, fecha_pedido } = pedidoData;
    const sql = 'INSERT INTO pedidos (id_cliente, id_libro, fecha_pedido) VALUES (?, ?, ?)';
    connection.query(sql, [id_cliente, id_libro, fecha_pedido], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Actualizar un pedido existente
function actualizarPedido(pedidoId, pedidoData, callback) {
    const { id_cliente, id_libro, fecha_pedido } = pedidoData;
    const sql = 'UPDATE pedidos SET id_cliente = ?, id_libro = ?, fecha_pedido = ? WHERE id_pedido = ?';
    connection.query(sql, [id_cliente, id_libro, fecha_pedido, pedidoId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un pedido
function eliminarPedido(pedidoId, callback) {
    const sql = 'DELETE FROM pedidos WHERE id_pedido = ?';
    connection.query(sql, [pedidoId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = {
    obtenerPedidos,
    crearPedido,
    actualizarPedido,
    eliminarPedido
};
