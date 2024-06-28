// articles/routes/index.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  let salida = {
    status_code: 200,
    status_message: 'Ok',
    data: {
      title: 'soy el index del api xd!',
      description: 'conecto el perro api'
    }
  };
  res.set('Content-Type', 'application/json').status(200).send(salida);
});

module.exports = router;
