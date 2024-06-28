const express = require('express');
const router = express.Router();
const Article = require('../models/mdlArticle'); // Importar el modelo Article

// Ejemplo de uso del modelo
router.get('/', function(req, res) {
   Article.find({}, function(err, articles) {
       if (err) {
           res.status(500).send(err);
       } else {
           let salida = {
               status_code: 200,
               status_message: 'Ok',
               data: articles.length > 0 ? articles : 'List is empty'
           };
           res.set('Content-Type', 'application/json').status(200).send(salida);
       }
   });
});

// Más rutas y operaciones con Article...

module.exports = router;
