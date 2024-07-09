const Cliente = require('../models/cliente');

// Controladores CRUD para clientes

// Obtener todos los clientes
function obtenerClientes(req, res) {
    Cliente.obtenerClientes((err, clientes) => {
        if (err) {
            console.error('Error al obtener los clientes:', err);
            res.status(500).send('Error al obtener los clientes');
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
            res.status(500).send('Error al crear un nuevo cliente');
            return;
        }
        res.status(201).json({ message: 'Cliente creado exitosamente', clienteId: result.insertId });
    });
}

// Actualizar un cliente existente
function actualizarCliente(req, res) {
    const clienteId = req.params.id;
    const { nombre, apellido, email } = req.body;
    const clienteData = { nombre, apellido, email };

    Cliente.actualizarCliente(clienteId, clienteData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el cliente:', err);
            res.status(500).send('Error al actualizar el cliente');
            return;
        }
        res.json({ message: 'Cliente actualizado exitosamente', clienteId: clienteId });
    });
}

// Eliminar un cliente
function eliminarCliente(req, res) {
    const clienteId = req.params.id;

    Cliente.eliminarCliente(clienteId, (err, result) => {
        if (err) {
            console.error('Error al eliminar el cliente:', err);
            res.status(500).send('Error al eliminar el cliente');
            return;
        }
        res.json({ message: 'Cliente eliminado exitosamente', clienteId: clienteId });
    });
}

module.exports = {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};
