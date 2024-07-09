const Autor = require('../models/autor');

// Controladores CRUD para autores

// Obtener todos los autores
function obtenerAutores(req, res) {
    Autor.obtenerAutores((err, autores) => {
        if (err) {
            console.error('Error al obtener los autores:', err);
            res.status(500).send('Error al obtener los autores');
            return;
        }
        res.json(autores);
    });
}

// Crear un nuevo autor
function crearAutor(req, res) {
    const { nombre, apellido, fecha_nacimiento } = req.body;
    const autorData = { nombre, apellido, fecha_nacimiento };

    Autor.crearAutor(autorData, (err, result) => {
        if (err) {
            console.error('Error al crear un nuevo autor:', err);
            res.status(500).send('Error al crear un nuevo autor');
            return;
        }
        res.status(201).json({ message: 'Autor creado exitosamente', autorId: result.insertId });
    });
}

// Actualizar un autor existente
function actualizarAutor(req, res) {
    const autorId = req.params.id;
    const { nombre, apellido, fecha_nacimiento } = req.body;
    const autorData = { nombre, apellido, fecha_nacimiento };

    Autor.actualizarAutor(autorId, autorData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el autor:', err);
            res.status(500).send('Error al actualizar el autor');
            return;
        }
        res.json({ message: 'Autor actualizado exitosamente', autorId: autorId });
    });
}

// Eliminar un autor
function eliminarAutor(req, res) {
    const autorId = req.params.id;

    Autor.eliminarAutor(autorId, (err, result) => {
        if (err) {
            console.error('Error al eliminar el autor:', err);
            res.status(500).send('Error al eliminar el autor');
            return;
        }
        res.json({ message: 'Autor eliminado exitosamente', autorId: autorId });
    });
}

module.exports = {
    obtenerAutores,
    crearAutor,
    actualizarAutor,
    eliminarAutor
};
