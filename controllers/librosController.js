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
    const { titulo, genero, id_autor, precio } = req.body;
    const libroData = { titulo, genero, id_autor, precio };

    Libro.crearLibro(libroData, (err, result) => {
        if (err) {
            console.error('Error al crear un nuevo libro:', err);
            res.status(500).send('Error al crear un nuevo libro');
            return;
        }
        res.status(201).json({ message: 'Libro creado exitosamente', id_libro: result.insertId });
    });
}

// Actualizar un libro existente
function actualizarLibro(req, res) {
    const id_libro = req.params.id;
    const { titulo, genero, id_autor, precio } = req.body;
    const libroData = { titulo, genero, id_autor, precio };

    Libro.actualizarLibro(id_libro, libroData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el libro:', err);
            res.status(500).send('Error al actualizar el libro');
            return;
        }
        res.json({ message: 'Libro actualizado exitosamente', id_libro: id_libro });
    });
}

// Eliminar un libro
function eliminarLibro(req, res) {
    const id_libro = req.params.id;

    Libro.eliminarLibro(id_libro, (err, result) => {
        if (err) {
            console.error('Error al eliminar el libro:', err);
            res.status(500).send('Error al eliminar el libro');
            return;
        }
        res.json({ message: 'Libro eliminado exitosamente', id_libro: id_libro });
    });
}

module.exports = {
    obtenerLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};
