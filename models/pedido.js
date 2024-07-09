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
    const { cliente_id, libro_id, fecha_pedido } = pedidoData;
    const sql = 'INSERT INTO pedidos (cliente_id, libro_id, fecha_pedido) VALUES (?, ?, ?)';
    connection.query(sql, [cliente_id, libro_id, fecha_pedido], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Actualizar un pedido existente
function actualizarPedido(pedidoId, pedidoData, callback) {
    const { cliente_id, libro_id, fecha_pedido } = pedidoData;
    const sql = 'UPDATE pedidos SET cliente_id = ?, libro_id = ?, fecha_pedido = ? WHERE id = ?';
    connection.query(sql, [cliente_id, libro_id, fecha_pedido, pedidoId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar un pedido
function eliminarPedido(pedidoId, callback) {
    const sql = 'DELETE FROM pedidos WHERE id = ?';
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
