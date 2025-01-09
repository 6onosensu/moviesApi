const {db} = require('../db');
const Utils = require('./utils');


exports.getAllGenres = async (req, res) => {
    try {
        const data = await db.Genre.findAll();
        res.status(200).send(data.map(({genreID, title}) => {return {genreID, title}}));
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve genres" });
    }
};

exports.getGenreById = async (req, res) => {
    const genre = await getGenre(req, res);
    if (!genre) return;
    res.send(genre);
};

const getGenre = async (req, res) => {
    const id = parseInt(req.params.genreID);
    if (isNaN(id)) {
        res.status(400).send({ error: "ID must be a whole number" });
        return null;
    }

    const genre = genres.find((g) => g.genreID === id);
    if (!genre) {
        res.status(404).send({ error: `Genre with ID ${id} not found` });
        return null;
    }

    res.send(genre);
};

exports.updateGenre = async (req, res) => {
    const genre = await getGenre(req, res);
    if (!genre) return;

    const { title } = req.body;
    if (!title) {
        return res.status(400).send({ error: "Title is required" });
    }

    genre.title = title;
    const link = `${req.protocol}://${req.get("host")}/genres/${genre.genreID}`;
    res.status(200).location(link).send(genre);
};

exports.createGenre = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).send({ error: "Title parameter is missing" });
    }

    const newGenre = {
        genreID: genres.length + 1,
        title,
    };
    genres.push(newGenre);
    const link = `${Utils.getBaseUrl(req)}/genres/${newGenre.genreID}`;
    res.status(201).location(link).send(newGenre);
};

exports.deleteGenre = async (req, res) => {
    const genre = await getGenre(req, res);
    if (!genre) return;

    await genre.destroy();
    res.status(204).send({Error: 'No Content'});
};

/**
function getGenre(req, res) {
    const id = parseInt(req.params.genreID);
    if (isNaN(id)) {
        res.status(400).send({Error: `genreID not found`});
        return null;
    }
    const genre = genres.find( genre => genre.genreID === id)
    if (!genre) {
        res.status(404).send({Error: `Genre not found`});
        return null;
    }
    return genre;
}
 */