const Cliente = require('../models/cliente');

// Controladores CRUD para clientes

// Obtener todos los clientes
function obtenerClientes(req, res) {
    Cliente.obtenerClientes((err, clientes) => {
        if (err) {
            console.error('Error al obtener los clientes:', err);
            res.status(500).send('Error al obtener los clientes', err);
            return;
        }
        res.json(clientes);
    });
}

// Crear un nuevo cliente
function crearCliente(req, res) {
    const { nombre, apellido, email } = req.body;
    const clienteData = { nombre, apellido, email };

    Cliente.crearCliente(clienteData, (err, result) => {
        if (err) {
            console.error('Error al crear un nuevo cliente:', err);
            res.status(500).send('Error al crear un nuevo cliente', err);
            return;
        }
        res.status(201).json({ message: 'Cliente creado exitosamente', id_cliente: result.insertId });
    });
}

// Actualizar un cliente existente
function actualizarCliente(req, res) {
    const id_cliente = req.params.id;
    const { nombre, apellido, email } = req.body;
    const clienteData = { nombre, apellido, email };

    Cliente.actualizarCliente(id_cliente, clienteData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el cliente:', err);
            res.status(500).send('Error al actualizar el cliente', err);
            return;
        }
        res.json({ message: 'Cliente actualizado exitosamente', id_cliente: id_cliente });
    });
}

// Eliminar un cliente
function eliminarCliente(req, res) {
    const id_cliente = req.params.id;

    Cliente.eliminarCliente(id_cliente, (err, result) => {
        if (err) {
            console.error('Error al eliminar el cliente:', err);
            res.status(500).send('Error al eliminar el cliente', err);
            return;
        }
        res.json({ message: 'Cliente eliminado exitosamente', id_cliente: id_cliente });
    });
}

module.exports = {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};
