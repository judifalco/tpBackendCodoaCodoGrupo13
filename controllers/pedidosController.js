const Pedido = require('../models/pedido');

// Controladores CRUD para pedidos

// Obtener todos los pedidos
function obtenerPedidos(req, res) {
    Pedido.obtenerPedidos((err, pedidos) => {
        if (err) {
            console.error('Error al obtener los pedidos:', err);
            res.status(500).send('Error al obtener los pedidos');
            return;
        }
        res.json(pedidos);
    });
}

// Crear un nuevo pedido
function crearPedido(req, res) {
    const { cliente_id, libro_id, fecha_pedido } = req.body;
    const pedidoData = { cliente_id, libro_id, fecha_pedido };

    Pedido.crearPedido(pedidoData, (err, result) => {
        if (err) {
            console.error('Error al crear un nuevo pedido:', err);
            res.status(500).send('Error al crear un nuevo pedido');
            return;
        }
        res.status(201).json({ message: 'Pedido creado exitosamente', pedidoId: result.insertId });
    });
}

// Actualizar un pedido existente
function actualizarPedido(req, res) {
    const pedidoId = req.params.id;
    const { cliente_id, libro_id, fecha_pedido } = req.body;
    const pedidoData = { cliente_id, libro_id, fecha_pedido };

    Pedido.actualizarPedido(pedidoId, pedidoData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el pedido:', err);
            res.status(500).send('Error al actualizar el pedido');
            return;
        }
        res.json({ message: 'Pedido actualizado exitosamente', pedidoId: pedidoId });
    });
}

// Eliminar un pedido
function eliminarPedido(req, res) {
    const pedidoId = req.params.id;

    Pedido.eliminarPedido(pedidoId, (err, result) => {
        if (err) {
            console.error('Error al eliminar el pedido:', err);
            res.status(500).send('Error al eliminar el pedido');
            return;
        }
        res.json({ message: 'Pedido eliminado exitosamente', pedidoId: pedidoId });
    });
}

module.exports = {
    obtenerPedidos,
    crearPedido,
    actualizarPedido,
    eliminarPedido
};
