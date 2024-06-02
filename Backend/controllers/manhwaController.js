const Manhwa = require('../models/Manhwa');

exports.addManhwa = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const manhwa = new Manhwa({
            title,
            author,
            description,
            coverImage: req.file.path,
        });
        await manhwa.save();
        res.status(201).send(manhwa);
    } catch (err) {
        res.status(400).send({ error: 'Failed to add manhwa.' });
    }
};

exports.getAllManhwas = async (req, res) => {
    try {
        const manhwas = await Manhwa.find();
        res.send(manhwas);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch manhwas.' });
    }
};

exports.getManhwaById = async (req, res) => {
    try {
        const manhwa = await Manhwa.findById(req.params.id);
        res.send(manhwa);
    } catch (err) {
        res.status(404).send({ error: 'Manhwa not found.' });
    }
};
