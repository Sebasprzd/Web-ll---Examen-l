const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'This field is required'] },
    description: { type: String, required: [true, 'This field is required'] },
    body: { type: String, required: [true, 'This field is required'] },
    author: { type: String, required: [true, 'This field is required'] },
    comments: [{
        comment: { type: String, required: [true, 'This field is required'] },
        author: { type: String, required: [true, 'This field is required'] }
    }]
});

mongoose.model('Article', articleSchema); // Registrar el esquema como modelo 'Article'

module.exports = mongoose.model('Article'); // Exportar el modelo
