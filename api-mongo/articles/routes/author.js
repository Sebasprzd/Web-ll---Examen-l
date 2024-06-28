// articles/routes/author.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  let salida = {
    status_code: 200,
    status_message: 'Ok',
    data: {
      name: 'yo sebas',
      nickname: 'soy un maestro pokemon',
      occupation: 'comer hamburguesas'
    }
  };
  res.set('Content-Type', 'application/json').status(200).send(salida);
});

module.exports = router;
