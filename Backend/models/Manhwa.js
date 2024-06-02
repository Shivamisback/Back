const mongoose = require('mongoose');

const ManhwaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String },
    chapters: [{ 
        title: String,
        content: String,
    }],
});

module.exports = mongoose.model('Manhwa', ManhwaSchema);
