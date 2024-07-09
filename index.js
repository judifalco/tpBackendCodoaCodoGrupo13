const express = require('express');
const bodyParser = require('body-parser');
const librosController = require('./controllers/librosController');
const autoresController = require('./controllers/autoresController');
const pedidosController = require('./controllers/pedidosController');
const clientesController = require('./controllers/clientesController');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'mysql-cac2024grupo13.alwaysdata.net',
    user: '368113',
    password: 'CaC2024',
    database: 'cac2024grupo13_tiendalibros'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Middleware para parsear body en JSON
app.use(bodyParser.json());

// Ruta por defecto para obtener todos los datos
app.get('/', obtenerAllDatos);

// Rutas específicas para cada recurso
// Libros
app.get('/libros', librosController.obtenerLibros);
app.post('/libros', librosController.crearLibro);
app.put('/libros/:id', librosController.actualizarLibro);
app.delete('/libros/:id', librosController.eliminarLibro);

// Autores
app.get('/autores', autoresController.obtenerAutores);
app.post('/autores', autoresController.crearAutor);
app.put('/autores/:id', autoresController.actualizarAutor);
app.delete('/autores/:id', autoresController.eliminarAutor);

// Clientes
app.get('/clientes', clientesController.obtenerClientes);
app.post('/clientes', clientesController.crearCliente);
app.put('/clientes/:id', clientesController.actualizarCliente);
app.delete('/clientes/:id', clientesController.eliminarCliente);

// Pedidos
app.get('/pedidos', pedidosController.obtenerPedidos);
app.post('/pedidos', pedidosController.crearPedido);
app.put('/pedidos/:id', pedidosController.actualizarPedido);
app.delete('/pedidos/:id', pedidosController.eliminarPedido);

// Función para obtener todos los datos de las tablas
function obtenerAllDatos(req, res) {
    const sqlAutores = 'SELECT * FROM autores';
    const sqlLibros = 'SELECT * FROM libros';
    const sqlPedidos = 'SELECT * FROM pedidos';
    const sqlClientes = 'SELECT * FROM clientes';

    connection.query(sqlAutores, (errAutores, resultsAutores) => {
        if (errAutores) {
            console.error('Error al obtener autores:', errAutores);
            res.status(500).send('Error al obtener autores');
            return;
        }

        connection.query(sqlLibros, (errLibros, resultsLibros) => {
            if (errLibros) {
                console.error('Error al obtener libros:', errLibros);
                res.status(500).send('Error al obtener libros');
                return;
            }

            connection.query(sqlPedidos, (errPedidos, resultsPedidos) => {
                if (errPedidos) {
                    console.error('Error al obtener pedidos:', errPedidos);
                    res.status(500).send('Error al obtener pedidos');
                    return;
                }

                connection.query(sqlClientes, (errClientes, resultsClientes) => {
                    if (errClientes) {
                        console.error('Error al obtener clientes:', errClientes);
                        res.status(500).send('Error al obtener clientes');
                        return;
                    }

                    const respuesta = {
                        autores: resultsAutores,
                        libros: resultsLibros,
                        pedidos: resultsPedidos,
                        clientes: resultsClientes
                    };

                    res.json(respuesta);
                });
            });
        });
    });
}

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
