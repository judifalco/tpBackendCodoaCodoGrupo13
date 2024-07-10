const Libro = require('../models/libro');

// Controladores CRUD para libros

// Obtener todos los libros
function obtenerLibros(req, res) {
    Libro.obtenerLibros((err, libros) => {
        if (err) {
            console.error('Error al obtener los libros:', err);
            res.status(500).send('Error al obtener los libros');
            return;
        }
        res.json(libros);
    });
}

// Crear un nuevo libro
function crearLibro(req, res) {
    const { titulo, genero, precio, autor_id } = req.body;
    const libroData = { titulo, genero, precio, autor_id };

    Libro.crearLibro(libroData, (err, result) => {
        if (err) {
            console.error('Error al crear un nuevo libro:', err);
            res.status(500).send('Error al crear un nuevo libro');
            return;
        }
        res.status(201).json({ message: 'Libro creado exitosamente', libroId: result.insertId });
    });
}

// Actualizar un libro existente
function actualizarLibro(req, res) {
    const libroId = req.params.id;
    const { titulo, genero, precio, autor_id } = req.body;
    const libroData = { titulo, genero, precio, autor_id };

    Libro.actualizarLibro(libroId, libroData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el libro:', err);
            res.status(500).send('Error al actualizar el libro',err);
            return;
        }
        res.json({ message: 'Libro actualizado exitosamente', libroId: libroId });
    });
}

// Eliminar un libro
function eliminarLibro(req, res) {
    const libroId = req.params.id;

    Libro.eliminarLibro(libroId, (err, result) => {
        if (err) {
            console.error('Error al eliminar el libro:', err);
            res.status(500).send('Error al eliminar el libro');
            return;
        }
        res.json({ message: 'Libro eliminado exitosamente', libroId: libroId });
    });
}

module.exports = {
    obtenerLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};
