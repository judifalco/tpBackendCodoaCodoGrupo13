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
    const { id_cliente, id_libro, fecha_pedido } = req.body;
    const pedidoData = { id_cliente, id_libro, fecha_pedido };

    Pedido.crearPedido(pedidoData, (err, result) => {
        if (err) {
            console.error('Error al crear un nuevo pedido:', err);
            res.status(500).send('Error al crear un nuevo pedido', err);
            return;
        }
        res.status(201).json({ message: 'Pedido creado exitosamente', id_pedido: result.insertId });
    });
}

// Actualizar un pedido existente
function actualizarPedido(req, res) {
    const id_pedido = req.params.id;
    const { id_cliente, id_libro, fecha_pedido } = req.body;
    const pedidoData = { id_cliente, id_libro, fecha_pedido };

    Pedido.actualizarPedido(id_pedido, pedidoData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el pedido:', err);
            res.status(500).send('Error al actualizar el pedido', err);
            return;
        }
        res.json({ message: 'Pedido actualizado exitosamente', id_pedido: id_pedido });
    });
}

// Eliminar un pedido
function eliminarPedido(req, res) {
    const id_pedido = req.params.id;

    Pedido.eliminarPedido(id_pedido, (err, result) => {
        if (err) {
            console.error('Error al eliminar el pedido:', err);
            res.status(500).send('Error al eliminar el pedido', err);
            return;
        }
        res.json({ message: 'Pedido eliminado exitosamente', id_pedido: id_pedido });
    });
}

module.exports = {
    obtenerPedidos,
    crearPedido,
    actualizarPedido,
    eliminarPedido
};
