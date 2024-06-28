// articles/routes/comment.js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Article = mongoose.model('Article');

// Agregar un comentario a un artículo existente
router.post('/', function(req, res) {
   var comment = {
       comment: req.body.comment,
       author: req.body.author
   };

   Article.findByIdAndUpdate(
       req.body.id,
       { $push: { comments: comment } },
       { new: true },
       function(err, updatedArticle) {
           if (err) {
               res.status(500).send(err);
           } else {
               let salida = {
                   status_code: 201,
                   status_message: 'Data was created',
                   data: 'soy un comentario'
               };
               res.set('Content-Type', 'application/json').status(201).send(salida);
           }
       }
   );
});

module.exports = router;
