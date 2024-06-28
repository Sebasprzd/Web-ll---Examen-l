var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/dbEntrenadores', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Importar los modelos
require('./models/entrenador');
require('./models/equipo');

// Rutas
var indexRouter = require('./routes/index');
var authorRouter = require('./routes/author');
var articleRouter = require('./routes/article');
var commentRouter = require('./routes/comment');
var entrenadoresRouter = require('./routes/entrenadores'); 
var equiposRouter = require('./routes/equipos'); // Nueva ruta para equipos

app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/article', articleRouter);
app.use('/comment', commentRouter);
app.use('/entrenadores', entrenadoresRouter); 
app.use('/equipos', equiposRouter); // Usar la nueva ruta para equipos

// Manejo de errores
app.use(function(req, res, next) {
   next(createError(404));
});

app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.json({
       status_code: err.status || 500,
       status_message: err.message,
       data: null
   });
});

// Ejecución del servidor
var server = app.listen(5005, function() {
   console.log(`Server is running on port ${server.address().port}`);
});
